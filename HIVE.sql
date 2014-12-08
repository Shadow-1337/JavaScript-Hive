/*
Navicat MySQL Data Transfer

Source Server         : wwww
Source Server Version : 50617
Source Host           : SECRET
Source Database       : dayz

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-10-05 12:41:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dropped_items
-- ----------------------------
DROP TABLE IF EXISTS `dropped_items`;
CREATE TABLE `dropped_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `imp` int(11) NOT NULL,
  `mt` varchar(100) NOT NULL,
  `time_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for objects
-- ----------------------------
DROP TABLE IF EXISTS `objects`;
CREATE TABLE `objects` (
  `ObjectID` varchar(32) NOT NULL,
  `model` varchar(50) NOT NULL DEFAULT '',
  `position` varchar(50) NOT NULL DEFAULT '1',
  `items` text NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ObjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for player
-- ----------------------------
DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `uid` varchar(32) NOT NULL,
  `model` varchar(50) NOT NULL DEFAULT '',
  `alive` tinyint(1) NOT NULL DEFAULT '1',
  `queue` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `items` text NOT NULL,
  `state` text NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `x` float NOT NULL DEFAULT '0',
  `y` float NOT NULL DEFAULT '0',
  `z` float NOT NULL DEFAULT '0',
  `dir_x` float NOT NULL DEFAULT '0',
  `dir_y` float NOT NULL DEFAULT '0',
  `dir_z` float NOT NULL DEFAULT '0',
  `up_0` int(11) NOT NULL DEFAULT '0',
  `up_1` int(11) NOT NULL DEFAULT '0',
  `up_2` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
