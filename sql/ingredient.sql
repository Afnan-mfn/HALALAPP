SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ingredient
-- ----------------------------
DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE `ingredient`  (
  `ingredient_id` int NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `ingredient_name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_ai_ci NULL COMMENT ' 配料表内容',
  `halal_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_ai_ci NULL DEFAULT NULL COMMENT ' 清真状态',
  ` create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT ' 创建时间',
  `delete_status` int NOT NULL DEFAULT 0 COMMENT ' 删除状态 0：未删除 1：删除',
  PRIMARY KEY (`ingredient_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_cs_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
