# Inventory Management Application

This repository contains an inventory management application consisting of two separate modules: one for the header and another for inventory data. Both modules share information from a common context store to keep track of the flow of data across the application.

## Features

### Admin Module

- An admin can perform the following actions:
  - Edit product details
  - Delete products
  - Disable/enable products

### User Module

- Users are restricted from performing any actions on the inventory data.

### Data Updates

- Whenever a product is deleted or edited, the widget data automatically gets updated accordingly.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your_username/inventory-management.git
