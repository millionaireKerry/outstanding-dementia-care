CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImageUrl` varchar(500),
	`category` varchar(100),
	`tags` text,
	`authorId` int NOT NULL,
	`published` boolean NOT NULL DEFAULT false,
	`featured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`publishedAt` timestamp,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ebooks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`coverImageUrl` varchar(500),
	`fileUrl` varchar(500) NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`fileSize` int,
	`category` varchar(100),
	`tags` text,
	`downloadCount` int NOT NULL DEFAULT 0,
	`authorId` int NOT NULL,
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ebooks_id` PRIMARY KEY(`id`),
	CONSTRAINT `ebooks_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `supportGroups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`url` varchar(500) NOT NULL,
	`category` varchar(100),
	`country` varchar(100),
	`region` varchar(100),
	`contactEmail` varchar(320),
	`contactPhone` varchar(50),
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `supportGroups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `voiceConversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(100) NOT NULL,
	`userId` int,
	`transcript` text NOT NULL,
	`response` text NOT NULL,
	`audioUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `voiceConversations_id` PRIMARY KEY(`id`)
);
