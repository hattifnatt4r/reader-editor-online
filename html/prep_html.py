#!/usr/bin/env python
# encoding: utf-8

import sys
import os
import pickle

def run():
	books = '/home/m/misc/web/reader/book_reader/html/books/'
	books_2 = 'books/'
	f = open(books+args.fname, 'rb')
	txt = str(f.read())
	#print(txt)
	f.close()
	txt_2=txt.replace('p','div')
	txt=txt_2.replace('</p','</div')
	print(len(txt))
	
	#-- remove <div id="TextSection" dir="ltr"> --------------------------
	k=0
	while k!=-1:
		k = txt.find('id', k+1)
		k2 = txt.find('" ', k+1)
		if k!=-1:
			txt_2 = txt[:k]+txt[k2:]
			txt=txt_2
	
	#-- numerate div -----------------------------------------------------
	c=1
	k = txt.find('<div')
	txt_2 = txt[0:k+4]+' id=dt'+str(c)+' '+txt[k+4:]
	txt=txt_2
	
	c=c+1
	while k!=-1:
		k = txt.find('<div', k+1)
		if k!=-1:
			txt_2 = txt[0:k+4]+' id=dt'+str(c)+' '+txt[k+4:]
		c = c+1
		txt = txt_2
	#print(txt)
	
	#-- numerate sentences -----------------------------------------------
	
	k=0
	c=1
	txt_2 = ''
	k_end = 0
	while k!=-1 :
		k = txt.find('<div', k)
		if k!= -1:
			k_start = txt.find('>', k+1)
			txt_2 += txt[k_end:k_start+1]
			k_end = txt.find('</div>', k_start)
			print(k, k_start, k_end)
			div = txt[k_start+1:k_end]
			print(div)
			i = 0
			div_i = ' <div id=st'+str(c)+'> '
			c += 1
			while i!=len(div)-1:
				i_end = div.find('. ', i+1)
				print('i_end=',i_end)
				if i_end != -1:
					div_i = div_i+ div[i+1:i_end+1]+ ' </div> <div id=st'+str(c)+'> '
					c+=1
				else:
					i_end = len(div)-1
					div_i = div_i+ div[i+1:] + ' </div>  '
				i = i_end
			print(div_i)
			txt_2 = txt_2+ div_i
			k = k_end+1
	txt_2 += txt[k_end:]
	txt = txt_2
	#-- numerate pics ----------------------------------------------------
	k=0
	c=1
	while k!=-1:
		fig = books_2+args.pname+'/'+str(args.chapter)+'_'+str(c)+'.jpg'
		k = txt.find('src=""', k+1)
		if k!=-1:
			txt_2 = txt[:k]+'src="'+fig+'"'+txt[k+6:]
			txt=txt_2
		c = c+1
	
	
	f = open(books+args.fname+'_prep', 'wb')
	f.write(txt)
	f.close()

if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument( '--fname','-f', type=str)
    parser.add_argument( '--pname','-p', type=str)
    parser.add_argument( '--chapter','--ch', type=int)
    
    args, sys.argv[1:] = parser.parse_known_args()
    run()
