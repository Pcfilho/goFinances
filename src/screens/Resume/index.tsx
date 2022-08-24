import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
} from './styles';

import { categories } from '../../utils/categories';


interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    color: string;
    total: number;
    totalFormatted: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);


    async function loadData() {
        const dataKey = '@goFinances:transactions';
        const data = await AsyncStorage.getItem(dataKey);
        const responseFormatted = data ? JSON.parse(data) : [];

        const expenses = responseFormatted
        .filter((expensive : TransactionData) => expensive.type === 'negative');

        const expensesTotal = expenses
        .reduce((acumullator : number, expense : TransactionData) => {
            return acumullator + Number(expense.amount);
        });

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expenses.forEach((expense : TransactionData) => {
                if(expense.category === category.key) {
                    categorySum += Number(expense.amount);
                };
            });

            const totalFormatted = categorySum
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

            if(categorySum > 0) {
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                });
            };
        });

        setTotalByCategories(totalByCategory);
    };


    useEffect(() => {
        loadData();
    }, []);


    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <ChartContainer>
                <VictoryPie 
                    data={totalByCategories}
                    x="name"
                    y="total"
                />
            </ChartContainer>

            <Content>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormatted}
                            color={item.color}
                        />
                    ))
                }
            </Content>
        </Container>
    );
};