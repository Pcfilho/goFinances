import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from './styles';

import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';


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
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const theme = useTheme();
    const { user } = useAuth();

    function handleChangeData(action : 'next' | 'prev') {
        if(action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        };
    }

    async function loadData() {
        setIsLoading(true);
        const dataKey = `@goFinances:transactions_user:${user.id}`;
        const data = await AsyncStorage.getItem(dataKey);
        const responseFormatted = data ? JSON.parse(data) : [];

        const expenses = responseFormatted
        .filter((expensive : TransactionData) => 
        expensive.type === 'negative' && 
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        );

        const expensesTotal = expenses
        .reduce((acumullator : number, expense : TransactionData) => {
            return acumullator + Number(expense.amount);
        }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expenses.forEach((expense : TransactionData) => {
                if(expense.category === category.key) {
                    categorySum += Number(expense.amount);
                };
            });

            if(categorySum > 0) {
                const totalFormatted = categorySum
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
                
                const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`;




                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                });
            };
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    };


    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            {
                isLoading ?
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary} 
                        size="large" 
                    />
                </LoadContainer>
                : 
                <Content
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton
                            onPress={() => handleChangeData('prev')}
                        >
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }</Month>

                        <MonthSelectButton
                            onPress={() => handleChangeData('next')}
                        >
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie 
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape,
                                }
                            }}
                            labelRadius={70}
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>

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
            
            }
        </Container>
    );
};