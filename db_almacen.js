"use strict";
//Verificamos si ya se ejecutó el script previamente
if (!localStorage.getItem('productosGuardados')) {
    // Definimos los productos
    const productos = [
        { codigo: 1, descripcion: 'Mesa de comedor', importe: 150, stock: 0 },
        { codigo: 2, descripcion: 'Silla de escritorio', importe: 50, stock: 10 },
        { codigo: 3, descripcion: 'Sofá de dos plazas', importe: 300, stock: 3 },
        { codigo: 4, descripcion: 'Cama individual', importe: 200, stock: 6 },
        { codigo: 5, descripcion: 'Escritorio de madera', importe: 100, stock: 8 },
        { codigo: 6, descripcion: 'Mesilla de noche', importe: 40, stock: 12 },
        { codigo: 7, descripcion: 'Estantería de metal', importe: 80, stock: 4 },
        { codigo: 10, descripcion: 'Televisor LED', importe: 500, stock: 2 },
        { codigo: 11, descripcion: 'Cocina de gas', importe: 250, stock: 4 },
        { codigo: 12, descripcion: 'Horno eléctrico', importe: 150, stock: 6 },
        { codigo: 13, descripcion: 'Lavavajillas', importe: 350, stock: 2 },
        { codigo: 14, descripcion: 'Refrigerador', importe: 800, stock: 1 },
        { codigo: 15, descripcion: 'Aspiradora', importe: 100, stock: 9 },
        { codigo: 16, descripcion: 'Cafetera', importe: 80, stock: 7 },
        { codigo: 17, descripcion: 'Batidora', importe: 60, stock: 10 },
        { codigo: 18, descripcion: 'Microondas', importe: 120, stock: 5 },
        { codigo: 19, descripcion: 'Plancha de vapor', importe: 50, stock: 12 },
        { codigo: 20, descripcion: 'Ventilador', importe: 40, stock: 15 },
        { codigo: 21, descripcion: 'Mochila de viaje', importe: 70, stock: 8 },
        { codigo: 22, descripcion: 'Bolso de mano', importe: 30, stock: 20 },
        { codigo: 23, descripcion: 'Reloj de pulsera', importe: 100, stock: 4 },
        { codigo: 24, descripcion: 'Zapatillas deportivas', importe: 80, stock: 6 },
        { codigo: 25, descripcion: 'Botas de invierno', importe: 120, stock: 3 },
        { codigo: 26, descripcion: 'Pantalones vaqueros', importe: 20, stock: 2 },
        { codigo: 27, descripcion: 'Mesa', importe: 10, stock: 4 },
        { codigo: 28, descripcion: 'Silla', importe: 5, stock: 10 },
        { codigo: 29, descripcion: 'Sofá', importe: 50, stock: 2 },
        { codigo: 30, descripcion: 'Cama', importe: 20, stock: 3 },
    ];

    // Guardamos los productos en el LocalStorage
    localStorage.setItem('almacen', JSON.stringify(productos));
} 