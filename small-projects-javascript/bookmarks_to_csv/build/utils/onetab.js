"use strict";

/*
OneTab
run this script in inspector
copy output to a json file
*/
const linkSectionStyle = '[style="padding-top: 15px; padding-left: 0px;"]';
const dateStyle = '[style="font-size: 11px; font-weight: 400; color: rgb(136, 136, 136); padding-top: 0px; padding-bottom: 2px;"]';
const linkSelector = 'a.clickable';
const linkSections = document.querySelectorAll(linkSectionStyle); // created 12/5/2019, ... -> 2019-12-05

const getFormattedDate = text => {
  const date = text.split(' ')[1];
  return new Date(date).toISOString().slice(0, 10);
};

const collection = [];
linkSections.forEach(section => {
  const date = section.querySelector(dateStyle).innerText;
  const links = section.querySelectorAll(linkSelector);
  const sectionData = Array.from(links).map(link => ({
    addDate: getFormattedDate(date),
    href: link.href,
    title: link.innerText
  }));
  collection.push(...sectionData);
}); // console.log(collection);

console.log(JSON.stringify(collection, null, 2));