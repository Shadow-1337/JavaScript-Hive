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
	a = clientsocket.recv(100000)
	if re.search("Pong", a):
		t = t + 1
print t
clientsocket.close()


clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
clientsocket.connect(("localhost", port))
for x in range(0, 1):		
	clientsocket.send("ObjectIDS")
	a = clientsocket.recv(100000)
	print a
clientsocket.close()



#array = a.split(",")
#
#clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#clientsocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
#clientsocket.connect(("localhost", port))
#for e in array:		
#	clientsocket.send("ObjectLoad: " + e)
#	a = clientsocket.recv(100000)
#	print a
#clientsocket.close()




clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
clientsocket.connect(("localhost", port))	
for x in range(0, 10):	
	clientsocket.send('ObjectSave: [["26934993660360","hilux1_civil_3_open",[0.995931,[2693.46,9936.59,273.973]]],[]]')
	a = clientsocket.recv(100000)
	print a
clientsocket.close()








time.sleep(1000)
