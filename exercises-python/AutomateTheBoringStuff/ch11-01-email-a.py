#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Usage:

Command Line:
    Input password as first argument.
    Subject: see below
    Body of message is the second argument on. 
        No need for quotes or anything like that.
        A default is hard-coded in if not provided at CLI.   
Subject:
    See the default subject in the script.

From / To: You'll have to hardcode your own addresses into the script.

(SENSITIVE INFORMATION: Be careful if you hardcode your password into the script.)

Created: 5/24/2017
'''

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText 
from sys import argv
 
fromaddr = "dcohen18@gmail.com"
toaddr = "dcohen18@gmail.com"
msg = MIMEMultipart()
msg['From'] = fromaddr
msg['To'] = toaddr
msg['Subject'] = "Python Email Output"

if len(argv) > 2:
    body = " ".join(argv[2:])
else:
    body = "HELLO FROM PYTHON SCRIPT!!! (default message)"

msg.attach(MIMEText(body, 'plain'))
 
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(fromaddr, argv[1])# or hard code in password
text = msg.as_string()
server.sendmail(fromaddr, toaddr, text)
server.quit()
