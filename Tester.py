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
import urllib2
import urllib
import json


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






print urllib2.urlopen("http://localhost:890/DayZServlet/lud0/load/?uid=33683593567475533&id=000000").read()





url = 'http://localhost:890/DayZServlet/lud0/create/?uid=33683593567475533&id=000000'
data = '{"model":"SurvivorPartsMaleWhite","alive":1,"pos":[13157.1,6.00144,7128.86],"dir":[0.890747,0,0.454499],"up":[0,1,0],"items":[{"slot":"body","type":"TShirtBlue"},{"slot":"legs","type":"HunterPants_Winter","items":[{"slot":"supply","type":"Tool_Flashlight","items":[{"slot":"batteryd","type":"Consumable_Battery9V","state":{"vars":{"power":30000}}}]}],"state":{"damage":0.223643}},{"slot":"feet","type":"AthleticShoes_Grey"}],"state":{"vars":{"exposure":0,"modifiers":["Hunger"],"modstates":[[[0],-1,87]],"bloodtype":"BloodONeg","blood":5000,"health":5000,"shock":0,"energy":932.957,"water":1689.78,"stomach":836,"diet":0.5,"unconscious":false,"mynotifiers":[false,false,["hungry",[0.525,0.541,0.031,1]]],"damagearray":[]}}}'
req = urllib2.Request(url)
req.add_header('Content-Type', 'application/json')
response = urllib2.urlopen(req, data)
print response.read()

url = 'http://localhost:890/DayZServlet/lud0/save/?uid=33683593567475533&id=000000'
data = '{"model":"SurvivorPartsMaleWhite","alive":1,"pos":[13157.1,6.00144,7128.86],"dir":[0.890747,0,0.454499],"up":[0,1,0],"items":[{"slot":"body","type":"TShirtBlue"},{"slot":"legs","type":"HunterPants_Winter","items":[{"slot":"supply","type":"Tool_Flashlight","items":[{"slot":"batteryd","type":"Consumable_Battery9V","state":{"vars":{"power":30000}}}]}],"state":{"damage":0.223643}},{"slot":"feet","type":"AthleticShoes_Grey"}],"state":{"vars":{"exposure":0,"modifiers":["Hunger"],"modstates":[[[0],-1,87]],"bloodtype":"BloodONeg","blood":5000,"health":5000,"shock":0,"energy":932.957,"water":1689.78,"stomach":836,"diet":0.5,"unconscious":false,"mynotifiers":[false,false,["hungry",[0.525,0.541,0.031,1]]],"damagearray":[]}}}'
req = urllib2.Request(url)
req.add_header('Content-Type', 'application/json')
response = urllib2.urlopen(req, data)
print response.read()


time.sleep(1000)
