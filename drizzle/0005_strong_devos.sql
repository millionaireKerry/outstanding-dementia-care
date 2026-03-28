CREATE TABLE `bookedDates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingDate` varchar(10) NOT NULL,
	`courseKey` varchar(100) NOT NULL,
	`stripeSessionId` varchar(255) NOT NULL,
	`customerEmail` varchar(320),
	`amount` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookedDates_id` PRIMARY KEY(`id`),
	CONSTRAINT `bookedDates_bookingDate_unique` UNIQUE(`bookingDate`),
	CONSTRAINT `bookedDates_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
