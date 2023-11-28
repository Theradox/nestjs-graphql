
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateOrderInput {
    ingredientIds: string[];
    coffeeIds: string[];
}

export class Coffee {
    id: string;
    name: string;
    description: string;
    characteristics: string[];
    coffeeAPIOrigin: string;
    thirdPartyCoffeeOrigin?: Nullable<string>;
    orders: Order[];
}

export abstract class IQuery {
    abstract coffee(id: string): Coffee | Promise<Coffee>;

    abstract coffees(): Coffee[] | Promise<Coffee[]>;

    abstract ingredients(): Ingredient[] | Promise<Ingredient[]>;

    abstract ingredient(id: string): Ingredient | Promise<Ingredient>;

    abstract orders(): Nullable<Order>[] | Promise<Nullable<Order>[]>;

    abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;
}

export class Ingredient {
    id: string;
    name: string;
    description: string;
    orders: Order[];
}

export class Order {
    id: string;
    ingredients: Ingredient[];
    coffees: Coffee[];
}

export abstract class IMutation {
    abstract orderCoffee(createOrderInput: CreateOrderInput): Nullable<Order> | Promise<Nullable<Order>>;
}

type Nullable<T> = T | null;
