#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Feb 22 15:55:58 2020

@author: vaibhavgole
"""

def sortkar(data):
    sortedlist=[]
    year=year1=[]
    month=[]
    day=[]
    yearws=[]
    new=[]
    yrmonthday=[]
    p=-1
    for k in range(len(data)):
        i=data[k].split('/')
        j=i[2][:len(i[2])-1]
        o=i[2][:len(i[2])]
        l=i[1]
        m=i[0]
        sep1=[]
        year.append(int(j))
        month.append(int(l))
        day.append(int(m))
        yearws.append(str(o))
        
#    print(i,' ',day,' ',month,' ',year) 
    year1=year.copy()
    month1=month.copy()
    day1=day.copy()
    while len(year) != 0:
        counts=year.count(min(year))
        yrmonthday.append([min(year),[]])
        p=p+1
        while counts !=0:
            minimm=min(year)
            index=year.index(minimm)
            sep1.append((year[index],month[index],day[index]))
            yrmonthday[p][1].append(month[index])
            day.remove(day[index])
            month.remove(month[index])
            year.remove(year[index])
            counts=counts-1
    for i in range(p+1):
        yrmonthday[i][1]=list(set(yrmonthday[i][1]))
    
    for i in range(len(yrmonthday)):
        for j in range(len(yrmonthday[i][1])):
            element=yrmonthday[i][1][j]
            yrmonthday[i][1][j]=[element,[]]



    for i in range(len(year1)):
        for j in range(len(yrmonthday)):
            if yrmonthday[j][0]==year1[i] :
                for k in range(len(yrmonthday[j][1])):
 #                   print("Very long : ",yrmonthday[j][1][k],month1)
                    if yrmonthday[j][1][k][0] == month1[i]:
                       yrmonthday[j][1][k][1].append(day1[i])
                       
                       
                       
                       
                       
    for i in range(len(yrmonthday)):
        for j in range(len(yrmonthday[i][1])):
            yrmonthday[i][1][j][1].sort()
            
            
#    print("\nline 459 : ",yrmonthday)
    sortedlist.clear()
    for i in range(len(yrmonthday)):
        for j in range(len(yrmonthday[i][1])):
            for k in range(len(yrmonthday[i][1][j][1])):
                if int(yrmonthday[i][1][j][1][k]) <=9:
                    yrmonthday[i][1][j][1][k]="0" + str(yrmonthday[i][1][j][1][k])
                if int(yrmonthday[i][1][j][0]) <=9:
                    yrmonthday[i][1][j][0]="0" + str(yrmonthday[i][1][j][0])                
 #               print("\nline 465 : i = ",i,"\tj = ",j,"\tk = ",k)
#                [[2019, [[12, [5, 7, 9, 23, 26, 28, 31]]]], [2020, [[1, [2]]]]]
                a=str(yrmonthday[i][1][j][1][k]) + "/" + str(yrmonthday[i][1][j][0]) + "/" + str(yrmonthday[i][0])
                sortedlist.append(a)

    return sortedlist