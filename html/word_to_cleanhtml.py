#!/usr/bin/env python
# encoding: utf-8

import sys
import os
import pickle

def run():
	books = '/home/m/misc/web/reader/book_reader/html/'
	books = '/home/m/misc/web/word2cleanhtml/'
	#books_2 = 'books/'
	f = open(args.fname, 'rb')
	txt = str(f.read())
	#print(txt)
	f.close()
	
	nl = txt[txt.find('@page')-2]
	#print('a'+nl+'a'+nl+'a')
	i1 = txt.find('<body')
	i2 = txt.find('>',i1+1)
	txt = '<html><body><div>'+txt[i2+1:]
	
	
	proceed=True
	while proceed:
		if txt.find('<span')==-1:
			proceed=False
		else:
			i1 = txt.find('<span')
			i2 = txt.find('>', i1+6)
			txt2 = txt[0:i1]+txt[i2+1:]
			txt = txt2
	txt = txt.replace('</span>','')
			
	proceed=True
	while proceed:
		if txt.find('style="')==-1:
			proceed=False
		else:
			i1 = txt.find('style="')
			i2 = txt.find('"', i1+7)
			txt2 = txt[0:i1]+txt[i2+1:]
			txt = txt2
	
	proceed=True
	while proceed:
		if txt.find('class="')==-1:
			proceed=False
		else:
			i1 = txt.find('class="')
			i2 = txt.find('"', i1+7)
			txt2 = txt[0:i1]+txt[i2+1:]
			txt = txt2
	proceed=True
	while proceed:
		if txt.find('id="')==-1:
			proceed=False
		else:
			i1 = txt.find('id="')
			i2 = txt.find('"', i1+4)
			txt2 = txt[0:i1]+txt[i2+1:]
			txt = txt2
			
	txt=txt.replace('<!--',nl+'<!--')
	proceed=True
	while proceed:
		if txt.find('<!--')==-1:
			proceed=False
		else:
			i1 = txt.find('<!--')
			i2 = txt.find('-->', i1+4)
			txt2 = txt[0:i1]+txt[i2+3:]
			txt = txt2
	
	proceed=True
	while proceed:
		txt = txt.replace('  ',' ')
		if txt.find('  ')==-1:
			proceed=False
	txt = txt.replace('> ','>')
	txt = txt.replace(' >','>')
	txt = txt.replace(' <','<')
	txt = txt.replace('< ','<')
	txt = txt.replace(' />','/>')
	txt = txt.replace('<a>',' ')
	txt = txt.replace('</a>',' ')
	txt = txt.replace('<a/>',' ')
	txt = replace_all(txt,'<div> </div>','')
	
	#txt=txt.replace('<p',nl+'<p')
	#txt=txt.replace('style',nl+'style')
	#txt=replace_all(txt,nl+nl,nl)
	
	txt_2=txt.replace('<p','<div')
	txt=txt_2.replace('</p','</div')
	txt=txt.replace(nl,'')
	
	txt = txt.replace('</div>','</div><div>')
	txt = txt.replace('<div>','</div><div>')
	txt = replace_all(txt,'<div><div>','<div>')
	txt = replace_all(txt,'</div></div>','</div>')
	txt = replace_all(txt,'<div></div>','')
	
	txt = txt.replace('<body></div>','<body>')
	txt = txt.replace('<div></body>','</body>')
	#txt=txt.replace('<div',nl+'<div')
	
	txt = txt.replace('</div>','<br> ')
	txt = txt.replace('<div>','')
	txt=txt.replace('<br>','<br>'+nl)
	
	beginning = '<?xml version="1.0" encoding="UTF-8"?>'
	f = open(args.fname.replace('.html','')+'_chapter.html', 'wb')
	f.write(beginning+txt)
	f.close()
	
	f = open(args.fname.replace('.html','')+'_chapter', 'wb')
	txt = txt.replace('<html><body>','')
	txt = txt.replace('</body></html>','')
	f.write(txt)
	f.close()

def replace_all(text, a,b):
	proceed=True
	while proceed:
		text = text.replace(a,b)
		if text.find(a)==-1:
			proceed=False
	return(text)

if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument( '--fname','-f', type=str)
    parser.add_argument( '--chapter','--ch', type=int)
    
    args, sys.argv[1:] = parser.parse_known_args()
    run()
