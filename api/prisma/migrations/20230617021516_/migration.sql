-- CreateTable
CREATE TABLE `bai_viet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tieu_de` VARCHAR(255) NULL,
    `hinh_anh` VARCHAR(255) NULL,
    `noi_dung` LONGTEXT NULL,
    `ngay` DATETIME(0) NULL,
    `nguoi_viet_id` INTEGER NULL,

    INDEX `bai_viet_ibfk_1`(`nguoi_viet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nguoi_dung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `pass_word` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `quyen` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `binh_luan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_bai_viet` INTEGER NULL,
    `ma_nguoi_dung` INTEGER NULL,
    `ngay_binh_luan` DATETIME(0) NULL,
    `noi_dung` VARCHAR(255) NULL,
    `id_cha` INTEGER NULL,
    `tag_user_name` VARCHAR(255) NULL,

    INDEX `binh_luan_ibfk_1`(`ma_bai_viet`),
    INDEX `binh_luan_ibfk_2`(`ma_nguoi_dung`),
    INDEX `binh_luan_ibfk_3`(`id_cha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thich` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_bai_viet` INTEGER NULL,
    `ma_nguoi_dung` INTEGER NULL,
    `ngay_thich` DATETIME(0) NULL,

    INDEX `thich_ibfk_1`(`ma_bai_viet`),
    INDEX `thich_ibfk_2`(`ma_nguoi_dung`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `luu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_bai_viet` INTEGER NULL,
    `ma_nguoi_dung` INTEGER NULL,

    INDEX `luu_ibfk_1`(`ma_bai_viet`),
    INDEX `luu_ibfk_2`(`ma_nguoi_dung`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bai_viet` ADD CONSTRAINT `bai_viet_ibfk_1` FOREIGN KEY (`nguoi_viet_id`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`ma_bai_viet`) REFERENCES `bai_viet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_ibfk_3` FOREIGN KEY (`id_cha`) REFERENCES `binh_luan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thich` ADD CONSTRAINT `thich_ibfk_1` FOREIGN KEY (`ma_bai_viet`) REFERENCES `bai_viet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thich` ADD CONSTRAINT `thich_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luu` ADD CONSTRAINT `luu_ibfk_1` FOREIGN KEY (`ma_bai_viet`) REFERENCES `bai_viet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luu` ADD CONSTRAINT `luu_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
