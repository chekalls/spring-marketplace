
INSERT INTO stock_status (`id`,`description`,`name`,`created_at`,`updated_at`) VALUES
(1,"l'ensemble des produits du lots n'ont pas encore été utilisés","unused",now(),now()),
(2,"Le lot a commencé à être utilisé","used",now(),now()),
(3,"Le lot ne possède plus aucun produit consommable","consumed",now(),now()),
(4,"Le reste de produit à uitlisé est en dessous du seuil critique","low state",now(),now());