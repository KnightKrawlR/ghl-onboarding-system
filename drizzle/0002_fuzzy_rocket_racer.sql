-- Custom SQL migration file, put your code below! --

-- Drop the old table
DROP TABLE IF EXISTS `onboarding_submissions`;

-- Create the new table with correct schema
CREATE TABLE `onboarding_submissions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_phone` varchar(50) NOT NULL,
  `company_email` varchar(320) NOT NULL,
  `company_website` varchar(500),
  `company_address` varchar(500) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(2) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `country` varchar(2) NOT NULL DEFAULT 'US',
  `owner_first_name` varchar(100) NOT NULL,
  `owner_last_name` varchar(100) NOT NULL,
  `owner_email` varchar(320) NOT NULL,
  `owner_phone` varchar(50) NOT NULL,
  `business_hours` text,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `ghl_location_id` varchar(255),
  `admin_notes` text,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `reviewed_at` timestamp,
  `reviewed_by` int,
  CONSTRAINT `onboarding_submissions_id` PRIMARY KEY(`id`),
  CONSTRAINT `onboarding_submissions_reviewed_by_users_id_fk` FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action
);