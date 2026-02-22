CREATE TABLE `dailyGoodNewsEditions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`editionDate` timestamp NOT NULL,
	`headline` varchar(255) NOT NULL,
	`stories` text NOT NULL,
	`reminiscenceContent` text,
	`quote` text,
	`pdfUrl` varchar(500),
	`pdfKey` varchar(500),
	`downloadCount` int NOT NULL DEFAULT 0,
	`generatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dailyGoodNewsEditions_id` PRIMARY KEY(`id`),
	CONSTRAINT `dailyGoodNewsEditions_editionDate_unique` UNIQUE(`editionDate`)
);
