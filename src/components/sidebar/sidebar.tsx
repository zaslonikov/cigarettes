import {
  Button,
  Flex,
  NumberInput,
  NumberInputProps,
  ScrollArea,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { IconBuildingFactory2, IconWorld } from "@tabler/icons-react";
import classes from "./sidebar.module.css";
import {
  LinksGroup,
  TCheckboxValue,
} from "@/components/links-group/links-group";
import { useDispatch, useSelector } from "react-redux";
import { selectCountries, selectManufacturers } from "@/store/common/selectors";
import React, { useState } from "react";
import { getProducts } from "@/store/data/thunks";
import { selectCurrentPage } from "@/store/data/selectors";
import { SIDEBAR_LABELS } from "@/constants/constants";

export type TSidebarFilters = {
  minPrice: number | string;
  maxPrice: number | string;
  manufacturer: Array<string>;
  country: Array<string>;
};

const initialFilters: TSidebarFilters = {
  manufacturer: [],
  country: [],
  maxPrice: 0,
  minPrice: 0,
};

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(selectCountries);
  const countries = useSelector(selectManufacturers);
  const currentPage = useSelector(selectCurrentPage);
  const [filters, setFilters] = useState<TSidebarFilters>(initialFilters);
  const sidebarLinks = [
    {
      label: "Страна",
      icon: IconBuildingFactory2,
      links: manufacturers,
      initiallyOpened: true,
    },
    {
      label: "Производитель",
      icon: IconWorld,
      initiallyOpened: true,
      links: countries,
    },
  ];

  const handleCheckBox = ({ id, value, label }: TCheckboxValue) => {
    if (label.toLowerCase() === SIDEBAR_LABELS.MANUFACTURER.toLowerCase()) {
      setFilters((prevFilters) => {
        const index = prevFilters.manufacturer.indexOf(value);
        if (index === -1) {
          return {
            ...prevFilters,
            manufacturer: [...prevFilters.manufacturer, value],
          };
        } else {
          return {
            ...prevFilters,
            manufacturer: [
              ...prevFilters.manufacturer.slice(0, index),
              ...prevFilters.manufacturer.slice(index + 1),
            ],
          };
        }
      });
    }
    if (label.toLowerCase() === SIDEBAR_LABELS.COUNTRY.toLowerCase()) {
      setFilters((prevFilters) => {
        const index = prevFilters.country.indexOf(value);
        if (index === -1) {
          return {
            ...prevFilters,
            country: [...prevFilters.country, value],
          };
        } else {
          return {
            ...prevFilters,
            country: [
              ...prevFilters.country.slice(0, index),
              ...prevFilters.country.slice(index + 1),
            ],
          };
        }
      });
    }
  };

  const sidebarItems = sidebarLinks.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      filters={filters}
      setFilters={setFilters}
      handleCheckBox={handleCheckBox}
    />
  ));

  const numberInputProps: NumberInputProps = {
    min: 0,
    max: 10000,
    clampBehavior: "strict",
    suffix: "₽",
  };

  const handleMinNumberInput = (value: number | string) => {
    setFilters({
      ...filters,
      minPrice: value,
    });
  };
  const handleMaxNumberInput = (value: number | string) => {
    setFilters({
      ...filters,
      maxPrice: value,
    });
  };

  const applyFilters = () => {
    dispatch(getProducts({ page: currentPage, filters }) as any);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Stack gap={"sm"}>
          <Title order={4}>Цена</Title>
          <NumberInput
            size={"sm"}
            placeholder="Минимальная цена"
            {...numberInputProps}
            onChange={handleMinNumberInput}
          />
          <NumberInput
            size={"sm"}
            placeholder="Максимальная цена"
            {...numberInputProps}
            onChange={handleMaxNumberInput}
          />
        </Stack>
      </div>
      <Space h="md" />
      <Title order={4}>Фильтры</Title>
      <Space h="xs" />

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{sidebarItems}</div>
        <Flex gap={"sm"} justify={"center"} align={"center"}>
          <Button onClick={clearFilters} size={"xs"}>
            Сбросить
          </Button>
          <Button onClick={applyFilters} size={"xs"}>
            Применить
          </Button>
        </Flex>
      </ScrollArea>
    </nav>
  );
};
