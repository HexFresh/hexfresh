import { StringIterator } from "lodash"

export interface IBadge{
  id:number,
title:string,
image:string,
description:string,
createdAt:string,
updatedAt:string,
user_badges: IUserBadge,
}

export interface IUserBadge{
  id: number,
  createdAt:string,
updatedAt:string,
userId: string,
badgeId: number,
}