-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.33 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour next-lms
-- CREATE DATABASE IF NOT EXISTS `next-lms` /*!40100 DEFAULT CHARACTER SET latin1 */;
-- USE `next-lms`;

-- Listage de la structure de la table next-lms. attachment
CREATE TABLE IF NOT EXISTS `attachment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Attachment_courseId_idx` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.attachment : ~2 rows (environ)
/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
INSERT INTO `attachment` (`id`, `name`, `url`, `courseId`, `createdAt`, `updatedAt`) VALUES
	('2d9dec58-60c6-44b5-9fa6-dd7103675be2', 'Indesign_course.pdf', 'https://utfs.io/f/89bfddf4-efc8-4179-8daf-ac0c5e32ca23-ltgoeq.pdf', 'be83d281-a1fe-4950-8356-da6753bfbc51', '2024-04-10 09:59:04.967', '2024-04-10 09:59:04.967'),
	('58f77546-e230-42ff-acdf-a989f04151d2', 'SQL_course1.pdf', 'https://utfs.io/f/e2b88dfc-f178-4eff-8a35-88b0b6497c2e-1iptz.pdf', 'e6051629-56b3-44ad-b22c-a6e8a2c44619', '2024-04-10 09:34:56.314', '2024-04-10 09:34:56.314'),
	('d2ec2c83-2b47-4768-84b1-9d1df056c5fd', 'SQL_course2.pdf', 'https://utfs.io/f/91799796-639c-422b-9bcc-794e37b1cd4b-1iptz.pdf', 'e6051629-56b3-44ad-b22c-a6e8a2c44619', '2024-04-10 08:55:41.507', '2024-04-10 08:55:41.507');
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. category
CREATE TABLE IF NOT EXISTS `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.category : ~9 rows (environ)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `name`) VALUES
	('6579f6c5-8582-404b-944b-8307287ad024', 'Accounting'),
	('9b0e39ef-6152-4e9c-acc3-0f4db066bf6d', 'Computer Science'),
	('a6c29973-f4ea-4e39-aa6d-9b49b001f482', 'Engineering'),
	('9a34acf8-49fb-42ee-bbb8-57a44a2d46c0', 'Filming'),
	('0fbc9db1-9f9d-401b-9b6d-588f653b625e', 'Fitness'),
	('1ce2ce10-a9f8-49cd-9fd0-bd1422399620', 'Graphic Design'),
	('0982018f-315c-4e33-8857-e01df2e52988', 'Music'),
	('34134a48-3cf3-4c5a-9210-224556fd159c', 'Photography'),
	('36fa0123-55a5-483d-ad20-a5301a63f7bf', 'Web development');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. chapter
CREATE TABLE IF NOT EXISTS `chapter` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` text COLLATE utf8mb4_unicode_ci,
  `position` int(11) NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isFree` tinyint(1) NOT NULL DEFAULT '0',
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Chapter_courseId_idx` (`courseId`),
  FULLTEXT KEY `Chapter_title_idx` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.chapter : ~10 rows (environ)
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` (`id`, `title`, `description`, `videoUrl`, `position`, `isPublished`, `isFree`, `courseId`, `createdAt`, `updatedAt`) VALUES
	('0dd5f8cb-af71-46bb-ac48-6585db3f60da', 'Outro', NULL, NULL, 3, 0, 0, 'be83d281-a1fe-4950-8356-da6753bfbc51', '2024-04-10 12:22:13.199', '2024-04-10 12:53:16.527'),
	('178bfb0f-b2a5-4599-9de9-c19e7c7a9952', 'Installation', '<p>Desc</p>', 'https://utfs.io/f/41a3d5d3-374b-4fe9-93e0-ee911da4a26a-m2yypu.mp4', 1, 1, 0, 'be83d281-a1fe-4950-8356-da6753bfbc51', '2024-04-10 11:11:32.269', '2024-04-23 08:54:19.116'),
	('2ffc1929-06b1-488d-8285-8e87419bd923', 'Introduction', '<p>Desc</p>', 'https://utfs.io/f/a1a3a49a-4b49-4020-ad9a-71607dc4a641-1rhq9e.mp4', 1, 1, 1, 'c33d7588-a087-44ac-b95b-c19ac82c4146', '2024-04-23 08:54:57.798', '2024-04-23 08:55:36.255'),
	('339ffebb-8099-4e2d-ab75-c47a0e1b9b00', 'Introduction', '<p>Desc</p>', 'https://utfs.io/f/94bf55ba-a090-442f-8ff3-a0a4b9ca31d6-1rhq9e.mp4', 0, 1, 1, 'be83d281-a1fe-4950-8356-da6753bfbc51', '2024-04-10 11:10:53.617', '2024-04-22 20:51:41.792'),
	('4bc468f7-9e31-42da-af1f-8a05b6a91cb2', 'Advanced features', '<p>Desc</p>', 'https://utfs.io/f/85a0657d-e103-4280-ac12-73c0316d77c3-m2yypu.mp4', 2, 1, 0, 'c33d7588-a087-44ac-b95b-c19ac82c4146', '2024-04-23 08:55:57.372', '2024-04-23 08:56:22.502'),
	('72113614-25c1-4e36-b010-812aac71cc2d', 'Basics', NULL, NULL, 2, 0, 0, '38669372-e9d6-4d7a-9ddc-d3cdc0aa1357', '2024-04-23 14:02:47.364', '2024-04-23 14:02:47.364'),
	('7cf0f26d-646f-444f-8723-2cd1672ac3bb', 'Introduction', '<p>Desc</p>', 'https://utfs.io/f/6619523f-dc6e-4037-82d3-66f5bd34c426-m54qk5.mp4', 1, 1, 1, '38669372-e9d6-4d7a-9ddc-d3cdc0aa1357', '2024-04-23 14:02:24.521', '2024-04-23 14:04:17.018'),
	('9b2c66d6-6ce7-4d1f-818f-7019c7a3aa91', 'Advanced course', NULL, NULL, 3, 0, 0, '38669372-e9d6-4d7a-9ddc-d3cdc0aa1357', '2024-04-23 14:03:04.159', '2024-04-23 14:03:04.159'),
	('9fb89ac8-5cdf-49bf-95f2-6e51688ddb53', 'Outro', '<p>Desc</p>', 'https://utfs.io/f/809aca4a-cf71-45ef-ad2f-c60d3e1582dd-m2yypu.mp4', 3, 1, 0, 'c33d7588-a087-44ac-b95b-c19ac82c4146', '2024-04-23 10:56:05.736', '2024-04-23 10:56:39.299'),
	('bc191c88-0830-45e8-8c08-3e44a508365e', 'Introduction', '<p>Desc</p>', 'https://utfs.io/f/c3f944be-ac95-47e6-814e-f8b7479539a7-1rhq9e.mp4', 1, 1, 0, '76bab29c-bb5b-4111-baf4-84fe31883fbb', '2024-04-23 10:08:46.624', '2024-04-23 10:09:18.666');
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. course
CREATE TABLE IF NOT EXISTS `course` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `imageUrl` text COLLATE utf8mb4_unicode_ci,
  `price` double DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_categoryId_idx` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.course : ~8 rows (environ)
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`id`, `userId`, `title`, `description`, `imageUrl`, `price`, `isPublished`, `categoryId`, `createdAt`, `updatedAt`) VALUES
	('01b9ad06-999b-424d-a9e7-0a2fedf3419f', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'PHP Basics', 'PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages. PHP is a widely-used, free, and efficient alternative to competitors such as Microsoft\'s ASP.', 'https://utfs.io/f/65545de0-729c-4e76-ad17-6b490c597271-pe61bn.jpg', 200, 0, '36fa0123-55a5-483d-ad20-a5301a63f7bf', '2024-04-09 16:04:36.001', '2024-04-10 09:47:24.008'),
	('38669372-e9d6-4d7a-9ddc-d3cdc0aa1357', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'OOP', 'Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior.\n\nOOP focuses on the objects that developers want to manipulate rather than the logic required to manipulate them. This approach to programming is well-suited for programs that are large, complex and actively updated or maintained. This includes programs for manufacturing and design, as well as mobile applications; for example, OOP can be used for manufacturing system simulation software', 'https://utfs.io/f/eaaaf348-75eb-46dc-914b-a72f36e7e587-2d1s.jpg', 500, 1, '36fa0123-55a5-483d-ad20-a5301a63f7bf', '2024-04-23 13:59:52.258', '2024-04-23 14:04:29.043'),
	('76bab29c-bb5b-4111-baf4-84fe31883fbb', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'Photoshop', 'Start a Photoshop course on LMS. Expert instructors can show you the art of enhancing images and creating picture elements for websites, and more.', 'https://utfs.io/f/5def34ef-32ce-4d3f-aef3-a11de933fa75-oj3qca.png', 1000, 1, '1ce2ce10-a9f8-49cd-9fd0-bd1422399620', '2024-04-08 15:41:15.946', '2024-04-23 10:09:25.311'),
	('896ba66c-6d72-497b-8ab6-7aab7346a5d7', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'NextJS', 'This is the NextJs course description', NULL, 150, 0, '36fa0123-55a5-483d-ad20-a5301a63f7bf', '2024-04-09 08:07:08.583', '2024-04-10 09:47:41.501'),
	('b042ab43-75fd-4ba6-a684-d30a1a054162', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'Advanced web development', NULL, NULL, NULL, 0, '36fa0123-55a5-483d-ad20-a5301a63f7bf', '2024-04-08 15:27:13.100', '2024-04-10 09:48:12.251'),
	('be83d281-a1fe-4950-8356-da6753bfbc51', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'Indesign', 'Adobe has worked with creative industry experts and the test design specialists at Certiport to identify the skills and concepts that are critical to using InDesign effectively in a professional context.', 'https://utfs.io/f/fa17de57-1d6e-43f0-8292-a94a10903c7a-uqe41n.jpg', 1000, 1, '1ce2ce10-a9f8-49cd-9fd0-bd1422399620', '2024-04-09 07:09:57.857', '2024-04-22 09:16:28.745'),
	('c33d7588-a087-44ac-b95b-c19ac82c4146', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'Photography', 'This is photography course', 'https://utfs.io/f/23d6d001-7345-425f-b122-3937fa74da43-h2e31y.jpg', 1000, 1, '34134a48-3cf3-4c5a-9210-224556fd159c', '2024-04-09 10:38:52.126', '2024-04-23 08:56:41.427'),
	('e6051629-56b3-44ad-b22c-a6e8a2c44619', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'SQL Basics', 'The course is suitable for beginners with no prior experience in SQL or database management, as well as professionals who want to refresh their skills. Overall, Learning Tree\'s Introduction to SQL Course is an excellent starting point for anyone looking to learn SQL and become proficient in database management and data engineering.', 'https://utfs.io/f/6ce51520-2f28-41c2-a5e9-e23f163bad82-7ivngp.png', 500, 0, '36fa0123-55a5-483d-ad20-a5301a63f7bf', '2024-04-10 06:56:29.484', '2024-04-10 09:46:54.782');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. muxdata
CREATE TABLE IF NOT EXISTS `muxdata` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assetId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `playbackId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chapterId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MuxData_chapterId_key` (`chapterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.muxdata : ~7 rows (environ)
/*!40000 ALTER TABLE `muxdata` DISABLE KEYS */;
INSERT INTO `muxdata` (`id`, `assetId`, `playbackId`, `chapterId`) VALUES
	('0f563361-c509-407b-a29d-2f2b7a9ca834', 'mdBwET01KfvpZU6JXH4m5EJvkGbIUX3w6CnzZKQhs01WU', 'NxZB7K01M102y3SmzC9vEKBLAZYe01Ql6WC2ynqYylHz9M', '4bc468f7-9e31-42da-af1f-8a05b6a91cb2'),
	('3d593937-0d67-4a11-ab3b-7a4eb14c5ab5', 'CO6cnaKz6qzUtY5ENYS4BkXTdE8tkeMFk6U15j00Joq4', 'RZ4XcyzT6XluI1KVjQW02Lv1G49Smbt7gkxMIwBPWszg', '2ffc1929-06b1-488d-8285-8e87419bd923'),
	('50054348-3e83-4026-a722-fb78517cdabc', 'k8syfuK00HE9I00OswoSx6GbwhJK8BqhWY48WZMWmIa4Q', 'CvAll5ySB2SCtJPf4cC8BVft4eRLHyxB00IrI8prqHK00', '178bfb0f-b2a5-4599-9de9-c19e7c7a9952'),
	('678db1a8-b6ce-47ff-ae38-9585922774d0', 'Fo81mNc01I5nweu01202b1xQ9fC3Qz01srM02NYfvA9zPoOk', 'YMw2sT17SQrYmF01WQafS8RwvxRNSg4EcN91E018O3V02c', '9fb89ac8-5cdf-49bf-95f2-6e51688ddb53'),
	('9101428b-29d7-4486-8879-c654c1362f7f', 'aMIzwPmh02Yw7rlsDgXIRfOoQSYnaV4Ah3ems826l63U', 'e6VyARY01TmlCwBTGGVFflT3cQRFSh8E022tb00u4VgP8w', 'bc191c88-0830-45e8-8c08-3e44a508365e'),
	('d2af57bc-6381-4791-9f39-8cfa8f3d857c', '9qxTZiI1dahGEtCO5oG86NcoBV4pvrJOgiCsPPUZ2YI', 'uoHSRM3MKg6pwhr5602LecSS02wmY6POj02Ss7aPxiPPMw', '339ffebb-8099-4e2d-ab75-c47a0e1b9b00'),
	('eb32a86f-fc85-4d76-b661-9b7ddc453fe8', 'k1KEte6EocHyTWlJ9d9baPf3riBx02uvufjf19jz7w01U', 'Echvtrq6at02Wi496QX37nh00aI2bK25Wd102iTCyVI01aM', '7cf0f26d-646f-444f-8723-2cd1672ac3bb');
/*!40000 ALTER TABLE `muxdata` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. purchase
CREATE TABLE IF NOT EXISTS `purchase` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Purchase_userId_courseId_key` (`userId`,`courseId`),
  KEY `Purchase_courseId_idx` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.purchase : ~3 rows (environ)
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` (`id`, `userId`, `courseId`, `createdAt`, `updatedAt`) VALUES
	('053ffe2b-7667-473b-a6fa-9eca11a2aab2', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'c33d7588-a087-44ac-b95b-c19ac82c4146', '2024-04-23 08:57:17.650', '2024-04-23 08:57:17.650'),
	('177545cd-6ec3-4ee5-a0f1-b24b87dec230', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'be83d281-a1fe-4950-8356-da6753bfbc51', '2024-04-23 08:51:31.127', '2024-04-23 08:51:31.127'),
	('226ef6e8-7247-4b78-a7a4-9f5f17cf198e', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '38669372-e9d6-4d7a-9ddc-d3cdc0aa1357', '2024-04-23 14:05:47.415', '2024-04-23 14:05:47.415');
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. stripecustomer
CREATE TABLE IF NOT EXISTS `stripecustomer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripeCustomerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StripeCustomer_userId_key` (`userId`),
  UNIQUE KEY `StripeCustomer_stripeCustomerId_key` (`stripeCustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.stripecustomer : ~1 rows (environ)
/*!40000 ALTER TABLE `stripecustomer` DISABLE KEYS */;
INSERT INTO `stripecustomer` (`id`, `userId`, `stripeCustomerId`, `createdAt`, `updatedAt`) VALUES
	('714831ca-7259-45df-be3b-d775dbba9bee', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', 'cus_PycHc195FnrLjw', '2024-04-23 08:50:18.767', '2024-04-23 08:50:18.767');
/*!40000 ALTER TABLE `stripecustomer` ENABLE KEYS */;

-- Listage de la structure de la table next-lms. userprogress
CREATE TABLE IF NOT EXISTS `userprogress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapterId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserProgress_userId_chapterId_key` (`userId`,`chapterId`),
  KEY `UserProgress_chapterId_idx` (`chapterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-lms.userprogress : ~6 rows (environ)
/*!40000 ALTER TABLE `userprogress` DISABLE KEYS */;
INSERT INTO `userprogress` (`id`, `userId`, `chapterId`, `isCompleted`, `createdAt`, `updated`) VALUES
	('38728c55-e769-4e38-b421-2509fb065d8b', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '2ffc1929-06b1-488d-8285-8e87419bd923', 1, '2024-04-23 10:56:54.868', '2024-04-23 10:56:54.868'),
	('4386a9cd-354b-4aef-b1ff-f4d7a01536ab', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '9fb89ac8-5cdf-49bf-95f2-6e51688ddb53', 0, '2024-04-23 11:11:05.709', '2024-04-23 11:11:13.265'),
	('49b778e1-e7f9-4a0f-a15d-6653256a9c93', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '339ffebb-8099-4e2d-ab75-c47a0e1b9b00', 1, '2024-04-23 10:55:18.466', '2024-04-23 10:55:18.466'),
	('66e2b6e5-c376-4d30-8770-39f108b455e9', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '7cf0f26d-646f-444f-8723-2cd1672ac3bb', 1, '2024-04-23 14:05:56.567', '2024-04-23 14:05:56.567'),
	('d0710a69-0cad-4567-94d9-e1c25de1bd7d', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '4bc468f7-9e31-42da-af1f-8a05b6a91cb2', 0, '2024-04-23 11:10:54.723', '2024-04-23 11:11:17.224'),
	('e0f4f658-db57-4a23-84e9-bd0e6ac0385a', 'user_2eoLarSxbCbD3prsjRkh6IgYLNm', '178bfb0f-b2a5-4599-9de9-c19e7c7a9952', 1, '2024-04-23 11:53:05.452', '2024-04-23 12:07:54.940');
/*!40000 ALTER TABLE `userprogress` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
