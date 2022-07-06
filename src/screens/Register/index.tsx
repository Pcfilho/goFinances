import React, { useState } from "react";
import { Modal } from 'react-native';


import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../CategorySelect";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from "./styles";


export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });


    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    };

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    };

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    };

    function handleRegister() {
        console.log('Register');
    };

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            
            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                        keyboardType="numeric"
                    />

                    <TransactionTypes>
                        <TransactionTypeButton 
                            title="Income" 
                            type="up" 
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            title="Outcome" 
                            type="down"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypes>
                    
                    <CategorySelectButton 
                        title={category.name}
                        onPress={() => handleOpenSelectCategoryModal()}
                    />


                </Fields>



                <Button 
                    title="Enviar"
                    onPress={() => handleRegister()}
                /> 
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}