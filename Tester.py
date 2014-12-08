#!/usr/bin/env python
import socket
import time
import traceback
import select
import struct
import sys
import re
import os
import atexit
import MySQLdb


port = 9433
backlog = 50

t = 0
clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
clientsocket.connect(("localhost", port))
for x in range(0, 10):		
	clientsocket.send("Ping")
	a = clientsocket.recv(100)
	if re.search("Pong", a):
		t = t + 1
print t
clientsocket.close()



t = 0
clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
clientsocket.connect(("localhost", port))
for x in range(0, 10):		
	clientsocket.send("ObjectLoad: 34234")
	a = clientsocket.recv(100)
	print a
	if re.search("Pong", a):
		t = t + 1
print t
clientsocket.close()
