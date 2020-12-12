from flask import Flask,render_template,Response,request,redirect,session,jsonify
from jinja2 import Template

import json
from flask_session import Session

import mysql.connector

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True

app.config['SESSION_TYPE'] = "filesystem"
app.config["SESSION_FILE_DIR"] = "sess"
app.config["SESSION_PERMANENT"] = True
app.secret_key = "secretkey"

Session(app)

# Make sure no response is cached
@app.after_request
def after_request(response):

	response.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate'
	response.headers['Expires'] = 0
	response.headers['Pragma'] = 'no-cache'

	return response


# Global limit of comment
CHAR_LIMIT = 140

# MySQL database hosted on Apache Serever
# sql connection to sever
conn = mysql.connector.connect(
	host='localhost',
	user='root',
	passwd="",
	database='commentx'
)

# check for pattern like "@example" and
# insert into mention of `example` user
def check_mentions(c_id,c_text):

	# Excluding first split
	at_splits = c_text.split('@')[1:]

	def map_splits(item):
		if item!='' and item.split(' ')[0]!='':
			return item.split(' ')[0]

	mention_users = map( map_splits , at_splits )
	mention_users = list(filter( lambda x:x!=None , mention_users ))

	def map_rows(each_mention_user):
		return (c_id,0,each_mention_user)

	insert_rows = list( map(map_rows,mention_users) )

	cursor = conn.cursor()
	ins = "INSERT IGNORE INTO notif_table (c_id,m_type,m_user)\
		   VALUES (%s,%s,%s)"
	val = insert_rows

	cursor.executemany(ins,val)
	conn.commit()

	return

@app.route('/api/add_comment',methods=["POST"])
def add_comment():

	char_limit = 140

	json_receive = request.get_json()
	
	username = json_receive['username']
	comment = json_receive['comment']
	url = json_receive['url']

	response = {
		'status':False
	}

	# check if its within charlimit
	if len(comment)>140 and len(comment)<1:
		return response

	if len(username)<1 and len(url)<1:
		return response

	cursor = conn.cursor()
	ins = "INSERT INTO comment_table (c_text,c_username,c_url,c_vote)\
		   VALUES (%s,%s,%s,%s)"
	val =( comment , username , url , 0 )

	cursor.execute(ins,val)
	
	sel = "SELECT LAST_INSERT_ID()"
	cursor.execute(sel)
	comment_id = cursor.fetchone()[0]
	conn.commit()

	print( comment_id )

	# TODO : Best to Apply Thread here
	check_mentions(comment_id,comment)

	response['status'] = True
	return jsonify(response)



@app.route('/api/show_comments',methods=["POST"])
def show_comment():

	# Constant to limit number of comment fetched at each request
	fetch_limit = 10

	json_receive = request.get_json()
	
	# Require only `url`
	url = json_receive['url']

	response = {
		'status':False
	}

	cursor = conn.cursor(dictionary=True)

	sel = "SELECT * from comment_table WHERE c_url=%s ORDER BY c_date DESC LIMIT %s"
	val =( url , fetch_limit , )

	cursor.execute(sel,val)
	comm_list = cursor.fetchall()
	conn.commit()

	response['status'] = True
	response['comments'] = comm_list
	
	return jsonify( response )



@app.route('/api/vote',methods=["POST"])
def add_vote():

	json_receive = request.get_json()
	
	comment_id = json_receive['comment_id']
	vote = json_receive['vote']

	response = {
		'status':False
	}

	# check if its within charlimit
	if vote!=1 and vote!=-1:
		return response

	cursor = conn.cursor()
	upd = "UPDATE comment_table SET c_vote = c_vote + %s\
		   WHERE c_id=%s"
	val =( vote , comment_id )

	cursor.execute(upd,val)
	conn.commit()

	cursor = conn.cursor()

	ins = "INSERT INTO notif_table (c_id,m_type,m_user)\
		   SELECT %s,%s,c_username FROM comment_table WHERE c_id=%s\
		   ON DUPLICATE KEY UPDATE m_datetime=NOW()"

	val = (comment_id,1,comment_id)

	cursor.execute(ins,val)
	conn.commit()

	response['status'] = True

	return response
	

@app.route('/api/get_notif',methods=["POST"])
def get_notif():

	json_receive = request.get_json()
	username = json_receive['username']

	response = {}

	# check if its within charlimit
	if username is None or username=="":
		return response

	cursor = conn.cursor(dictionary=True)
	sel = 'SELECT notif_table.*,comment_table.c_text,comment_table.c_url,comment_table.c_vote\
			FROM notif_table\
			LEFT JOIN comment_table\
			ON notif_table.c_id=comment_table.c_id\
			WHERE m_user=%s\
			ORDER BY notif_table.m_datetime DESC'
	val = ( username , )

	cursor.execute(sel,val)
	notifs_list = cursor.fetchall()
	conn.commit()

	response['notifs'] = notifs_list

	return response


@app.route('/api/delete_notifs',methods=["POST"])
def delete_notifs():

	json_receive = request.get_json()
	username = json_receive['username']

	# check if its within charlimit
	if username is None or username=="":
		return response

	cursor = conn.cursor(dictionary=True)
	sel = 'DELETE FROM notif_table WHERE m_user=%s'
	val = ( username , )

	cursor.execute(sel,val)
	conn.commit()

	response = {
		'success':True
	}

	return response












