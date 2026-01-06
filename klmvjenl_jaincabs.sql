

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Table structure for table `guest_carts`
--

CREATE TABLE `guest_carts` (
  `id` int(11) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guest_wishlist`
--

CREATE TABLE `guest_wishlist` (
  `id` int(11) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------


--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `address` text NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `payment_method` enum('COD','UPI') NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `gst` decimal(10,2) NOT NULL,
  `shipping` decimal(10,2) NOT NULL,
  `making` decimal(10,2) NOT NULL,
  `grand_total` decimal(10,2) NOT NULL,
  `payment_status` enum('Pending','Pending Confirmation','Paid','Failed','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `user_id`, `name`, `phone`, `email`, `address`, `pincode`, `payment_method`, `subtotal`, `gst`, `shipping`, `making`, `grand_total`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 'MB20250830A213AE', 2, 'Ayushi Agrawal', '9694410462', 'beingayushi13@gmail.com', 'hkhkjh', '485771', 'COD', 5295.00, 158.85, 0.00, 529.50, 5983.35, 'Pending', '2025-08-30 14:28:32', '2025-08-30 14:28:32'),
(2, 'MB20250831CEE4F3', 2, 'Ayush Agrawal', '8685865868', 'manbharcadjewellery22@gmail.com', 'fddfvdz', '877888', 'UPI', 999.00, 29.97, 50.00, 99.90, 1178.87, '', '2025-08-31 03:46:33', '2025-08-31 03:46:33'),
(3, 'MB202508319FA5FD', 2, 'Ayush Agrawal', '8685865868', 'ajayagrawal0068@gmail.com', 'ndff', '335344', 'COD', 599.00, 17.97, 50.00, 59.90, 726.87, 'Pending', '2025-08-31 04:03:56', '2025-08-31 04:03:56'),
(4, 'MB20250831763C19', 2, 'Ayush Agrawal', '7828298545', 'manbharcadjewellery22@gmail.com', 'cffdfd', '877888', 'UPI', 300.00, 9.00, 50.00, 30.00, 389.00, '', '2025-08-31 04:04:40', '2025-08-31 04:04:40');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(2, 1, 4, 1, 599.00),
(3, 1, 5, 1, 1699.00),
(4, 2, 5, 1, 1699.00),
(5, 3, 2, 1, 499.00),
(6, 3, 3, 1, 999.00),
(7, 4, 4, 1, 599.00),
(8, 4, 5, 1, 1699.00),
(9, 5, 4, 1, 599.00),
(10, 5, 5, 1, 1699.00),
(11, 1, 3, 3, 999.00),
(12, 1, 4, 1, 599.00),
(13, 1, 5, 1, 1699.00),
(14, 2, 3, 1, 999.00),
(15, 3, 4, 1, 599.00);

-- --------------------------------------------------------

--
-- Table structure for table `otp_codes`
--

CREATE TABLE `otp_codes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `otp_codes`
--

INSERT INTO `otp_codes` (`id`, `user_id`, `phone`, `otp`, `expires_at`, `verified`, `created_at`) VALUES
(1, 2, '7828298545', '677314', '2025-09-05 09:41:24', 0, '2025-09-05 04:06:24'),
(2, 2, '7828298545', '644775', '2025-09-05 09:57:10', 0, '2025-09-05 04:22:10'),
(3, NULL, '7828298545', '712622', '2025-09-06 10:16:00', 0, '2025-09-06 04:41:00'),
(4, NULL, '9549115020', '273978', '2025-09-09 08:49:37', 0, '2025-09-09 03:14:37'),
(5, NULL, '9549115020', '389363', '2025-09-09 08:50:58', 0, '2025-09-09 03:15:58');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `image` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tag` varchar(255) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `stones` varchar(255) DEFAULT NULL,
  `gross_weight` decimal(10,2) DEFAULT NULL,
  `metal_weight` decimal(10,2) DEFAULT NULL,
  `stone_weight` decimal(10,2) DEFAULT NULL,
  `additional_info` text DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `stock`, `image`, `category`, `created_at`, `updated_at`, `tag`, `size`, `dimensions`, `material`, `stones`, `gross_weight`, `metal_weight`, `stone_weight`, `additional_info`, `video`) VALUES
(2, ' Engagment Ring.', 'Princess Cut Aquamarine Zircon Engagment Ring\r\nin brass metal with high quality Gold polish.', 499.00, 0, 'uploads/products/1758372734_68cea37edc845.png,uploads/products/1758372734_68cea37edd4e2.png,uploads/products/1758372734_68cea37ede1e1.png', 'Rings', '2025-09-20 12:52:14', '2025-09-20 12:52:14', 'Bestseller ', 'US 7', '', 'Brass', 'Aquamarine and Zircon', 0.00, 3.00, 0.00, '0', '');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `github_username` varchar(50) DEFAULT NULL,
  `leetcode_username` varchar(50) DEFAULT NULL,
  `linkedin_profile` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `github_username`, `leetcode_username`, `linkedin_profile`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'john.doe@college.edu', 'johndoe', 'johndoe123', 'https://linkedin.com/in/johndoe', '2025-08-02 04:46:58', '2025-08-02 04:46:58'),
(2, 'Jane Smith', 'jane.smith@college.edu', 'janesmith', 'janesmith456', 'https://linkedin.com/in/janesmith', '2025-08-02 04:46:58', '2025-08-02 04:46:58'),
(3, 'Mike Johnson', 'mike.johnson@college.edu', 'mikejohnson', 'mikej789', 'https://linkedin.com/in/mikejohnson', '2025-08-02 04:46:58', '2025-08-02 04:46:58');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('participant','judge','admin') DEFAULT 'participant',
  `name` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `table_number` int(10) NOT NULL,
  `registration_id` varchar(255) DEFAULT NULL,
  `participant_course` varchar(255) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `project_type` varchar(255) DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `project_domain` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_type`, `username`, `password`, `role`, `name`, `branch`, `table_number`, `registration_id`, `participant_course`, `project_name`, `project_type`, `project_url`, `project_domain`, `email`, `created_at`) VALUES
(1, NULL, 'niddhi sharma ', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'web technology 1', NULL, '2025-04-01 16:51:34'),
(2, NULL, 'manish sharma', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'web technology 1', NULL, '2025-04-01 16:51:34'),
(3, NULL, 'preeti chandak', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'web technology 2', NULL, '2025-04-01 16:51:34'),
(4, NULL, 'shankar morwal', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'web technology 2', NULL, '2025-04-01 16:51:34'),
(5, NULL, 'aniruddh', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'Artificial Intelligence ', NULL, '2025-04-01 16:51:34'),
(6, NULL, 'uma shankar arora', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'Artificial Intelligence ', NULL, '2025-04-01 16:51:34'),
(7, NULL, 'riddhi soral', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'AI&ML\n(SAS), Cyber Security and Cloud Computing', NULL, '2025-04-01 16:51:34'),
(8, NULL, 'himani sharma', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'AI&ML\n(SAS), Cyber Security and Cloud Computing\n', NULL, '2025-04-01 16:51:34'),
(9, NULL, 'ashish dutt sharma ', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'Core Engineering (ME, CV, EE&CE)', NULL, '2025-04-01 16:51:34'),
(10, NULL, 'pratish rawat', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'admin', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-01 16:51:34'),
(11, NULL, 'ajay khunteta', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'admin', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(12, NULL, 'dev kumar', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(13, NULL, 'abhishek', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(14, NULL, 'mukesh vyas', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(15, NULL, 'mukul gupta', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(16, NULL, 'navneet agarwal', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', '\r\n', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(17, NULL, 'navneet agarwal', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(18, NULL, 'amit bhardwaj', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(19, NULL, 'aakash khandelwal', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(20, NULL, 'riddhi soral', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(21, NULL, 'amit jain', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(22, NULL, 'renuka saini', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(23, NULL, 'neha khandelwal', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'judge', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(24, NULL, 'vishnu sharma', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'admin', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(25, NULL, 'deepika saxena', '$2y$10$yGJcecVFzLH/xin7B6sU.ugPDCjc4WkAM.kVxcl13Saek7BCOg2rq\r\n', 'admin', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'current_timestamp()'),
(26, 'user_type', 'username', 'password', '', 'name', 'branch', 0, 'registration_id', 'participant_course', 'project_name', 'project_type', 'project_url', 'project_domain', 'email', 'created_at'),
(27, 'participant', '', '', 'participant', 'Ayush Agrawal', 'BTech CE', 1, '', '', 'Prayogam2025- University Tech Fest Website', '', '', 'Web Technology 1', '', ''),
(28, 'participant', '', '', 'participant', 'Devansh Pratap Singh Rajawat', 'Btech AIDS', 2, '', '', 'Student Result Management System', '', '', 'Web Technology 1', '', ''),
(29, 'participant', '', '', 'participant', 'Akshat', 'BTech CE', 3, '', '', 'Chat Web App', '', '', 'Web Technology 1', '', ''),
(30, 'participant', '', '', 'participant', 'Bhumika Yadav', 'Btech AIDS', 4, '', '', 'Sora', '', '', 'Web Technology 1', '', ''),
(31, 'participant', '', '', 'participant', 'Akash kumar singh', 'BTech CE', 5, '', '', 'Autism health helpline', '', '', 'Web Technology 1', '', ''),
(32, 'participant', '', '', 'participant', 'Devesh shukla ', 'BTech CE', 6, '', '', 'SID GOLF VENUE/ TRAINER\n', '', '', 'Web Technology 1', '', ''),
(33, 'participant', '', '', 'participant', 'Dev kumar singh', 'BTech CE', 7, '', '', 'Bhasa mitra', '', '', 'Web Technology 1', '', ''),
(34, 'participant', '', '', 'participant', 'Naveen Jangir', 'BTech CE', 8, '', '', 'Smart kisan dashboard', '', '', 'Web Technology 1', '', ''),
(35, 'participant', '', '', 'participant', 'Rishi Pareek', 'BTech CE', 9, '', '', 'A Portal for job vacanies', '', '', 'Web Technology 1', '', ''),
(36, 'participant', '', '', 'participant', 'Aditya Sharma', 'BTech CE', 10, '', '', 'Gigglade', '', '', 'Web Technology 1', '', ''),
(37, 'participant', '', '', 'participant', 'Pijus das', 'BTech CE', 11, '', '', 'Chatify Ai chat enhancer ', '', '', 'Web Technology 1', '', ''),
(38, 'participant', '', '', 'participant', 'Mohi Ganeriwal', 'BTech AIDS', 12, '', '', 'Women Safety app', '', '', 'Web Technology 1', '', ''),
(39, 'participant', '', '', 'participant', 'Ankit Roy', 'Btech AIDS', 13, '', '', 'All in One Organizer ', '', '', 'Web Technology 1', '', ''),
(40, 'participant', '', '', 'participant', 'Abhishek gupta ', 'B.tech CE', 14, '', '', 'Blood banking', '', '', 'Web Technology 1', '', ''),
(41, 'participant', '', '', 'participant', 'Aman Kumar Jangid', 'Btech AIDS', 15, '', '', 'Student grade tracker system', '', '', 'Web Technology 1', '', ''),
(42, 'participant', '', '', 'participant', 'Anshika', 'Btech AIDS', 16, '', '', 'Plagiarism Detector', '', '', 'Web Technology 1', '', ''),
(43, 'participant', '', '', 'participant', 'AMIT ', 'B.tech ', 17, '', '', 'Auto vault', '', '', 'Web Technology 1', '', ''),
(44, 'participant', '', '', 'participant', 'Divyanshu Singh Rajawat', 'Btech AIDS', 18, '', '', 'Brain buzz', '', '', 'Web Technology 1', '', ''),
(45, 'participant', '', '', 'participant', 'Yug Pathak ', 'B.Tech CE', 19, '', '', 'FinAssist', '', '', 'Web Technology 1', '', ''),
(46, 'participant', '', '', 'participant', 'Daksh raj kachawa', 'B.Tech CE', 20, '', '', 'A platform for content creator', '', '', 'Web Technology 1', '', ''),
(47, 'participant', '', '', 'participant', 'Jai Yadav', 'BTech AIDS', 21, '', '', 'EDUvortex', '', '', 'Web Technology 1', '', ''),
(48, 'participant', '', '', 'participant', 'Preeti Swami', 'BTech AIDS', 22, '', '', 'Hospital recommendation system', '', '', 'Web Technology 1', '', ''),
(49, 'participant', '', '', 'participant', 'Ronit sharma', 'BTech AIDS', 23, '', '', 'TS logistics (vehicle rental website)', '', '', 'Web Technology 2', '', ''),
(50, 'participant', '', '', 'participant', 'Sarthak Kala', 'BTech AIDS', 24, '', '', 'Doctor Appointment Booking System', '', '', 'Web Technology 2', '', ''),
(51, 'participant', '', '', 'participant', 'Rahul Singh', 'BTech AIDS', 25, '', '', 'Restaurant Billing System', '', '', 'Web Technology 2', '', ''),
(52, 'participant', '', '', 'participant', 'Rudrakshi Rathore', 'BTech AIDS', 26, '', '', 'Menstrual cycle tracker', '', '', 'Web Technology 2', '', ''),
(53, 'participant', '', '', 'participant', 'Pooja Shekhawat', 'BTech AIDS', 27, '', '', 'Bus Reservation System', '', '', 'Web Technology 2', '', ''),
(54, 'participant', '', '', 'participant', 'Pratik jangid', 'BTech AIDS', 28, '', '', 'Airlines reservation system', '', '', 'Web Technology 2', '', ''),
(55, 'participant', '', '', 'participant', 'Varsha Wadhwani', 'BTech AIDS', 29, '', '', 'Inventory management system', '', '', 'Web Technology 2', '', ''),
(56, 'participant', '', '', 'participant', 'Yashika Sharma', 'BTech AIDS', 30, '', '', 'Fake news protection', '', '', 'Web Technology 2', '', ''),
(57, 'participant', '', '', 'participant', 'Varun veer singh chauhan', 'BTech AIDS', 31, '', '', 'Triple threat calculator', '', '', 'Web Technology 2', '', ''),
(58, 'participant', '', '', 'participant', 'Yashraj Singh', 'BTech AIDS', 32, '', '', 'Bus reservation system ', '', '', 'Web Technology 2', '', ''),
(59, 'participant', '', '', 'participant', 'Ujjwal kumar sinha', 'BTech AIDS', 33, '', '', 'SPAM E-MAIL DETECTOR', '', '', 'Web Technology 2', '', ''),
(60, 'participant', '', '', 'participant', 'Vartika yadav', 'BTech AIDS', 34, '', '', 'Restaurant management system', '', '', 'Web Technology 2', '', ''),
(61, 'participant', '', '', 'participant', 'Umesh Sharma', 'BTech AIDS', 35, '', '', 'Online Auction System', '', '', 'Web Technology 2', '', ''),
(62, 'participant', '', '', 'participant', 'Aniket Mishra', 'BTech AIDS', 36, '', '', 'Student management ', '', '', 'Web Technology 2', '', ''),
(63, 'participant', '', '', 'participant', 'Parth Sharma', 'B.Tech AIDS', 37, '', '', 'E-Commerce Website', '', '', 'Web Technology 2', '', ''),
(64, 'participant', '', '', 'participant', 'Aditya Singh Shekhawat', 'BTech CE', 38, '', '', 'Musica', '', '', 'Web Technology 2', '', ''),
(65, 'participant', '', '', 'participant', 'Anushka Srivastava', 'BTech CE', 39, '', '', 'Stockify', '', '', 'Web Technology 2', '', ''),
(66, 'participant', '', '', 'participant', 'Dherya Pratap Singh', 'BTech CE', 40, '', '', 'E commerce website', '', '', 'Web Technology 2', '', ''),
(67, 'participant', '', '', 'participant', 'Sandesh Gupta', 'BTech CE', 41, '', '', 'Librabry managment system', '', '', 'Web Technology 2', '', ''),
(68, 'participant', '', '', 'participant', 'Rahul Kumar', 'BTech AIDS', 42, '', '', 'Hospital management', '', '', 'Web Technology 2', '', ''),
(69, 'participant', '', '', 'participant', 'Santosh Saini', 'B.Tech CE', 43, '', '', 'Employee Management System  ', '', '', 'Web Technology 2', '', ''),
(70, 'participant', '', '', 'participant', 'Yuvansh Jain ', 'B.Tech CE', 44, '', '', 'Ryuk A.I.', '', '', 'Web Technology 2', '', ''),
(71, 'participant', '', '', 'participant', 'Aakash Singh', 'BTech CE ', 45, '', '', 'Learn Semester', '', '', 'Web Technology 2', '', ''),
(72, 'participant', '', '', 'participant', 'Adarsh Jaiswal', 'BTech CE', 46, '', '', 'INSCRIBE', '', '', 'Artificial Intelligence ', '', ''),
(73, 'participant', '', '', 'participant', 'Bhavya Alag', 'BTech CE', 47, '', '', 'zapzone', '', '', 'Artificial Intelligence ', '', ''),
(74, 'participant', '', '', 'participant', 'Kshitiz Sharma', 'BTech CE', 48, '', '', 'Fem Gaurdian', '', '', 'Artificial Intelligence ', '', ''),
(75, 'participant', '', '', 'participant', 'Kartik Dutt Mathur', 'BTech CE', 49, '', '', 'Cafe Management System', '', '', 'Artificial Intelligence ', '', ''),
(76, 'participant', '', '', 'participant', 'Khushi Kumari', 'BTech CE', 50, '', '', 'BHARAT DIARIES', '', '', 'Artificial Intelligence ', '', ''),
(77, 'participant', '', '', 'participant', 'Vijesh Kumar', 'B.Tech CE', 51, '', '', 'The last day on Earth (Game)', '', '', 'Artificial Intelligence ', '', ''),
(78, 'participant', '', '', 'participant', 'Jasleen Kaur', 'BTech CE', 52, '', '', 'Saving Souls', '', '', 'Artificial Intelligence ', '', ''),
(79, 'participant', '', '', 'participant', 'Tanvi Mathur', 'BTech CE', 53, '', '', 'WhatsApp chat analyser', '', '', 'Artificial Intelligence ', '', ''),
(80, 'participant', '', '', 'participant', 'Veer pratap singh', 'Btech AIDS', 54, '', '', 'Zetabot', '', '', 'Artificial Intelligence ', '', ''),
(81, 'participant', '', '', 'participant', 'Aryan Raj', 'Btech AIDS', 55, '', '', 'Alex voice assistant', '', '', 'Artificial Intelligence ', '', ''),
(82, 'participant', '', '', 'participant', 'Divya Bharti', 'Btech AIDS', 56, '', '', 'News filter', '', '', 'Artificial Intelligence ', '', ''),
(83, 'participant', '', '', 'participant', 'Somya Yadav', 'BTech CE', 57, '', '', 'Action detection for sign language', '', '', 'Artificial Intelligence ', '', ''),
(84, 'participant', '', '', 'participant', 'Lavish Singh Rajawat', 'BTech AIDS', 58, '', '', 'JARVIS AI', '', '', 'Artificial Intelligence ', '', ''),
(85, 'participant', '', '', 'participant', 'Saurav Kumar', 'BTech AIDS', 59, '', '', 'SmartDocs - AI powered PDF Chatbot', '', '', 'Artificial Intelligence ', '', ''),
(86, 'participant', '', '', 'participant', 'Shriyansh Singh Rathore', 'BTech AIDS', 60, '', '', 'Room Finder Bot', '', '', 'Artificial Intelligence ', '', ''),
(87, 'participant', '', '', 'participant', 'Purab Sen', 'BTech AIDS', 61, '', '', 'Pdf text to speech', '', '', 'Artificial Intelligence ', '', ''),
(88, 'participant', '', '', 'participant', 'Prince Kumar', 'BTech AIDS', 62, '', '', 'PDF Summarizer', '', '', 'Artificial Intelligence ', '', ''),
(89, 'participant', '', '', 'participant', 'Dolly Sharma', 'BTech CS&CC', 63, '', '', 'AI Chatbot', '', '', 'Artificial Intelligence ', '', ''),
(90, 'participant', '', '', 'participant', 'Pinku Yadav', 'B.Tech AIDS', 64, '', '', 'AI based language translator', '', '', 'Artificial Intelligence ', '', ''),
(91, 'participant', '', '', 'participant', 'MOHIT SINGH PAPOLA', 'BTech CS&CC', 65, '', '', 'PHISHNET X - PHISHING EMAIL AND WEBSITE DETECTION', '', '', 'Artificial Intelligence ', '', ''),
(92, 'participant', '', '', 'participant', 'Chitranshu V Varughese', 'Btech CE', 66, '', '', 'GRU AI', '', '', 'Artificial Intelligence ', '', ''),
(93, 'participant', '', '', 'participant', 'Deepak Sharma', 'BTech CE', 67, '', '', 'Drop Mate', '', '', 'Artificial Intelligence ', '', ''),
(94, 'participant', '', '', 'participant', 'Aditi singh', 'BTech AIML', 68, '', '', 'Muzic player', '', '', 'Artificial Intelligence ', '', ''),
(95, 'participant', '', '', 'participant', 'Himanshi', 'BTech CE', 69, '', '', 'FemGuardian', '', '', 'AI&ML (SAS), Cyber Security and Cloud Computing', '', ''),
(96, 'participant', '', '', 'participant', 'Piyush Agarwal', 'BTech CE', 70, '', '', 'College shortlister', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(97, 'participant', '', '', 'participant', 'Arinjai Gupt', 'Btech AIDS', 71, '', '', 'Quiz Master', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(98, 'participant', '', '', 'participant', 'Juhi Bhushan', 'BTech AIDS', 72, '', '', 'Personalized Health Monitoring App', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(99, 'participant', '', '', 'participant', 'Aviral Gupta', 'BTech AIDS ', 73, '', '', 'Hospital Management System', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(100, 'participant', '', '', 'participant', 'Ayushman Singh Gaur', 'BTech AIDS ', 74, '', '', 'Airlines Management System', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(101, 'participant', '', '', 'participant', 'UDAY ', 'Btech. CS&CT', 75, '', '', 'cryptography tool', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(102, 'participant', '', '', 'participant', 'Akshat Siraswal', 'BTech AIML', 76, '', '', 'Ai Based Sentiment analyzer for social media', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(103, 'participant', '', '', 'participant', 'Manvendra Singh', 'BTech AIML', 77, '', '', 'Virtual gesture mouse', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(104, 'participant', '', '', 'participant', 'Bharat Sharma', 'BTech AIML', 78, '', '', 'Ask for pdf', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(105, 'participant', '', '', 'participant', 'Nishant Pareek', 'BTech AIML', 79, '', '', 'Soul connect - Mental health AI chatbot', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(106, 'participant', '', '', 'participant', 'Pranay verma', 'BTech AIML', 80, '', '', 'Pneumonia detection', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(107, 'participant', '', '', 'participant', 'vikram singh ', 'BTech AIML', 81, '', '', 'Online exam portal', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(108, 'participant', '', '', 'participant', 'Sumit kumar', 'BTech AIML', 82, '', '', 'Face detection', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(109, 'participant', '', '', 'participant', 'Shlok Gupta', 'BTech AIML', 83, '', '', 'AI Object detection', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(110, 'participant', '', '', 'participant', 'Yash Avasthi', 'BTech AIML', 84, '', '', 'Jarvis', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(111, 'participant', '', '', 'participant', 'Shubham ', 'BTech AIDS ', 85, '', '', 'Bank management ', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(112, 'participant', '', '', 'participant', 'Kashish Kumar Meshram', 'BTech AIML', 86, '', '', 'Student accommodation app destiny4u ', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(113, 'participant', '', '', 'participant', 'Karan Singh', 'BTech AIML', 87, '', '', 'Urbannest (Apna Pg) ', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(114, 'participant', '', '', 'participant', 'Kapil Kumawat', 'BTech AIML', 88, '', '', 'Secure Vote ', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(115, 'participant', '', '', 'participant', 'Surya Vardhan Singh Solanki', 'B.tech CS&CT', 89, '', '', 'Real - Time Security', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(116, 'participant', '', '', 'participant', 'Aman Singh Rathore', 'BTech CS&CC', 90, '', '', 'Sports car landing page', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(117, 'participant', '', '', 'participant', 'Agni Goswami', 'B.tech AIML', 91, '', '', 'Hire Karo ', '', '', 'AI&ML\n(SAS), Cyber Security and Cloud Computing', '', ''),
(118, 'participant', '', '', 'participant', 'Tushar Tanwar', 'B. Tech. (ME+ECE)', 92, '', '', 'Vayu', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(119, 'participant', '', '', 'participant', 'Shubham', 'B. Tech. (ME+ECE)', 93, '', '', 'Line following car', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(120, 'participant', '', '', 'participant', 'Tanu sharma', 'B. Tech. (ME+ECE)', 94, '', '', 'Solar and AI integrated wheelchair', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(121, 'participant', '', '', 'participant', 'Nikhil soni', 'B. Tech. (ME+ECE)', 95, '', '', 'smart irrigation system baesd on iot', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(122, 'participant', '', '', 'participant', 'Shubham singh', 'B. Tech. (ME+ECE)', 96, '', '', 'Solar tracking system', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(123, 'participant', '', '', 'participant', 'Pinky Rathore', 'B. Tech. (ME+ECE)', 97, '', '', 'Scara Robot', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(124, 'participant', '', '', 'participant', 'Pushpendra Singh Naruka', 'B. Tech. (ME+ECE)', 98, '', '', 'Automatic Brake Sensor', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(125, 'participant', '', '', 'participant', 'Tushar Chauhan', 'B. Tech. (ME+ECE)', 99, '', '', 'Pheonixx - A69', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(126, 'participant', '', '', 'participant', 'Prins Kumar Sharma', 'B. Tech. (ME+ECE)', 100, '', '', 'FIRE EXTINGUISHER AUTOMOTIVE ROBOT', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(127, 'participant', '', '', 'participant', 'Shankar lal', 'B. Tech. (ME+ECE)', 101, '', '', 'Bluetooth Voice Control Home Automation', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(128, 'participant', '', '', 'participant', 'Deepak', 'B. Tech. (ME+ECE)', 102, '', '', 'Smart dustbin', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(129, 'participant', '', '', 'participant', 'Rishabh sharma', 'B. Tech. (ME+ECE)', 103, '', '', 'CV BUILDER', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(130, 'participant', '', '', 'participant', 'Radhe Keshav', 'B. Tech. (ME+ECE)', 104, '', '', 'Fire Detector', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(131, 'participant', '', '', 'participant', 'Piyushkumawat', 'B.tech CV', 105, '', '', 'Buildlayout.in', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(132, 'participant', '', '', 'participant', 'Mohit yadav', 'B.tech CV', 106, '', '', 'turned mass damper', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(133, 'participant', '', '', 'participant', 'Girish Meena', 'B.tech CV', 107, '', '', 'Wind Turbine', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(134, 'participant', '', '', 'participant', 'Prince Saini', 'B.tech CV', 108, '', '', 'Translucent Concrete Brick', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(135, 'participant', '', '', 'participant', 'Abhishek Tatiwal', 'B.tech CV', 109, '', '', 'River cleaning boat', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(136, 'participant', '', '', 'participant', 'Pulkit Jaiman', 'B.tech CV', 110, '', '', 'Smart parking', '', '', 'Core Engineering (ME, CV, EE&CE)', '', ''),
(137, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(138, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(139, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(140, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(141, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(142, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(143, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(144, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(145, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(146, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(147, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(148, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(149, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(150, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(151, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(152, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(153, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(154, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(155, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(156, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(157, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(158, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(159, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(160, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(161, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(162, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(163, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(164, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(165, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(166, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(167, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(168, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(169, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(170, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(171, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(172, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(173, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(174, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(175, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(176, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(177, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(178, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(179, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(180, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(181, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(182, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(183, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(184, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(185, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(186, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(187, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(188, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(189, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(190, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(191, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(192, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(193, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(194, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(195, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(196, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(197, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(198, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(199, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(200, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(201, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(202, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(203, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(204, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(205, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(206, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(207, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(208, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(209, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(210, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(211, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(212, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(213, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(214, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(215, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(216, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(217, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(218, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(219, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(220, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(221, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(222, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(223, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(224, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(225, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(226, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(227, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(228, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(229, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(230, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(231, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(232, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(233, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(234, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(235, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(236, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(237, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(238, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(239, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(240, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(241, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(242, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(243, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(244, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(245, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(246, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(247, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(248, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(249, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(250, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(251, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(252, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(253, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(254, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(255, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(256, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(257, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(258, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(259, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(260, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(261, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(262, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(263, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(264, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(265, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(266, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(267, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(268, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(269, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(270, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(271, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(272, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(273, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(274, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(275, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(276, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(277, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(278, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(279, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(280, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(281, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(282, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(283, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(284, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(285, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(286, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(287, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(288, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(289, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(290, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(291, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(292, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(293, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(294, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(295, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(296, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(297, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(298, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(299, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(300, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(301, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(302, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(303, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(304, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(305, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(306, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(307, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(308, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(309, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(310, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(311, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(312, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(313, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(314, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(315, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(316, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(317, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(318, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(319, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(320, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(321, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(322, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(323, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(324, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(325, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', ''),
(326, '', NULL, NULL, 'participant', '', '', 0, '', '', '', '', '', '', '', '2025-05-03 23:22:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `usertype` varchar(20) DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `usertype`, `created_at`, `updated_at`) VALUES
(1, 'Anisha Agrawal', 'manbharcadjewellery22@gmail.com', '$2y$10$fatr9X9lR5on.EWktzBBt.DhLQex2Uhx/78z1nWW7F.xeYaF6eB0a', 'admin', '2025-07-05 12:25:25', '2025-07-05 12:52:14'),
(2, 'Ayush agrawal', 'ajayagrawal0068@gmail.com', '$2y$10$H9sXupnroIY6yEYmiR5W1.S3U5B.cagM/.MDL5JLIpjH2BMHTme6i', 'admin', '2025-07-05 12:39:23', '2025-07-05 12:51:47'),
(3, 'bhoomi Arora', '2024csbhoomi16914@poornima.edu.in', '$2y$10$TbNezwDGCcULMBxc4kPUQ.6U6lL.dOXEhsQXnk3zMiMi5OpL7ub7q', 'customer', '2025-07-19 08:57:33', '2025-07-19 08:57:33'),
(4, 'Nancy shrivastava', 'shrivastavanancy382@gmail.com', '$2y$10$RManaL9LZfz/WgfXZnUqT.DatX6aNPdK.rOSmyzxX/7Coei6CRH.u', 'customer', '2025-07-31 14:56:41', '2025-07-31 14:57:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_events`
--

CREATE TABLE `user_events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `event_type` enum('search','view_product','add_to_cart','checkout','button_click') NOT NULL,
  `search_query` varchar(255) DEFAULT NULL,
  `button_name` varchar(50) DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_events`
--

INSERT INTO `user_events` (`id`, `user_id`, `product_id`, `event_type`, `search_query`, `button_name`, `timestamp`) VALUES
(1, 5, 1, 'button_click', NULL, 'Wishlist', '2025-09-08 11:55:59'),
(2, 4, 3, 'button_click', NULL, 'Add to Cart', '2025-09-08 11:55:59'),
(3, 1, 5, 'search', 'diamond necklace', NULL, '2025-09-08 11:55:59'),
(4, 3, 2, 'button_click', NULL, 'Buy Now', '2025-09-08 11:55:59'),
(5, 4, 2, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(6, 5, 2, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(7, 1, 4, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(8, 5, 5, 'button_click', NULL, 'Buy Now', '2025-09-08 11:55:59'),
(9, 3, 1, 'search', 'gold ring', NULL, '2025-09-08 11:55:59'),
(10, 3, 5, 'search', 'custom pendant', NULL, '2025-09-08 11:55:59'),
(11, 5, 5, 'button_click', NULL, 'Buy Now', '2025-09-08 11:55:59'),
(12, 2, 5, 'button_click', NULL, 'Wishlist', '2025-09-08 11:55:59'),
(13, 2, 3, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(14, 1, 5, 'search', 'silver bracelet', NULL, '2025-09-08 11:55:59'),
(15, 2, 3, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(16, 1, 2, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(17, 2, 2, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(18, 2, 1, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(19, 5, 4, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(20, 3, 4, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(21, 3, 3, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(22, 3, 4, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(23, 4, 2, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(24, 1, 3, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(25, 2, 5, 'search', 'custom pendant', NULL, '2025-09-08 11:55:59'),
(26, 1, 4, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(27, 5, 5, 'search', 'gold ring', NULL, '2025-09-08 11:55:59'),
(28, 1, 2, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(29, 4, 4, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(30, 4, 1, 'search', 'custom pendant', NULL, '2025-09-08 11:55:59'),
(31, 1, 5, 'search', 'diamond necklace', NULL, '2025-09-08 11:55:59'),
(32, 3, 5, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(33, 4, 3, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(34, 2, 2, 'search', 'silver bracelet', NULL, '2025-09-08 11:55:59'),
(35, 5, 4, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(36, 3, 1, 'button_click', NULL, 'Wishlist', '2025-09-08 11:55:59'),
(37, 3, 1, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(38, 5, 3, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(39, 5, 4, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(40, 1, 1, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(41, 4, 1, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(42, 1, 1, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(43, 1, 3, 'view_product', NULL, NULL, '2025-09-08 11:55:59'),
(44, 3, 5, 'button_click', NULL, 'Buy Now', '2025-09-08 11:55:59'),
(45, 5, 5, 'button_click', NULL, 'Buy Now', '2025-09-08 11:55:59'),
(46, 3, 1, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(47, 5, 5, 'add_to_cart', NULL, NULL, '2025-09-08 11:55:59'),
(48, 3, 1, 'checkout', NULL, NULL, '2025-09-08 11:55:59'),
(49, 2, 5, 'button_click', NULL, 'Wishlist', '2025-09-08 11:55:59'),
(50, 5, 3, 'button_click', NULL, 'Add to Cart', '2025-09-08 11:55:59');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `added_at`) VALUES
(1, 2, 2, '2025-09-20 13:06:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_student_source` (`student_id`,`source`),
  ADD KEY `idx_fetched_at` (`fetched_at`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `admin_events`
--
ALTER TABLE `admin_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_product_unique` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evaluations`
--
ALTER TABLE `evaluations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guest_carts`
--
ALTER TABLE `guest_carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_product_unique` (`session_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `guest_wishlist`
--
ALTER TABLE `guest_wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_product_unique` (`session_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `judges`
--
ALTER TABLE `judges`
  ADD PRIMARY KEY (`judge_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_order` (`order_id`),
  ADD KEY `fk_order_items_product` (`product_id`);

--
-- Indexes for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_students_github` (`github_username`),
  ADD KEY `idx_students_leetcode` (`leetcode_username`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_events`
--
ALTER TABLE `user_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_event_type` (`event_type`),
  ADD KEY `idx_product_id` (`product_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_product_unique` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_events`
--
ALTER TABLE `admin_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1318;

--
-- AUTO_INCREMENT for table `evaluations`
--
ALTER TABLE `evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `guest_carts`
--
ALTER TABLE `guest_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guest_wishlist`
--
ALTER TABLE `guest_wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `otp_codes`
--
ALTER TABLE `otp_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=327;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_events`
--
ALTER TABLE `user_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guest_carts`
--
ALTER TABLE `guest_carts`
  ADD CONSTRAINT `guest_carts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guest_wishlist`
--
ALTER TABLE `guest_wishlist`
  ADD CONSTRAINT `guest_wishlist_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
