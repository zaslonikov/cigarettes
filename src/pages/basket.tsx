import { Group, List, Mark, Space, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";
import { BasketCard } from "@/components/basket-card/basket-card";
import React from "react";
import { GetInTouch } from "@/components/get-in-touch/get-in-touch";
import { useStorageBasket } from "@/hooks/useStorageBasket";

const Basket = () => {
  const basketData = useSelector(selectBasketData);

  useStorageBasket();

  const totalPrice = basketData.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.amount,
    0,
  );
  return (
    <div>
      <Title order={2} className={"text-dimmed"}>
        Доставка
      </Title>
      <Space h={"md"} />
      <List className={"text-dimmed"}>
        <List.Item>Доставка: Бесплатная</List.Item>
        <List.Item>Способ оплаты: Наличными курьеру</List.Item>
      </List>
      <Space h={"md"} />
      <Title order={2} className={"text-dimmed"}>
        Корзина
      </Title>
      <Space h={"md"} />
      {basketData?.map((data) => <BasketCard product={data} />)}
      <Space h={"md"} />
      <Group justify={"end"}>
        <Title order={3} c={"white"}>
          Итого: <Mark color="gray">{totalPrice}₽</Mark>
        </Title>
      </Group>
      <Space h={"xl"} />
      <GetInTouch total={totalPrice} />
    </div>
  );
};

export default Basket;
