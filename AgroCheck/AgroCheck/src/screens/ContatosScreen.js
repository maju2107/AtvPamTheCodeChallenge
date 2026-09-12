import React, { useCallback, useEffect, useState } from 'react';
import {View, Text, FlatList, Button, Alert, TextInput, ActivityIndicator} from 'react-native';
import {getContactsPage, PAGE_SIZE} from '../services/contactsService';
import styles from '../styles/contactsStyles';

const ContatosScreen = () => {

   
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageOffset, setPageOffset] = useState(0);

    const loadContacts = useCallback(
        async (
            reset = false,
            searchTerm = search
        ) => {

            if (loading) {
                return;
            }

            if (!reset && !hasMore) {
                return;
            }


            setLoading(true);


            try {

                const currentOffset = reset
                    ? 0
                    : pageOffset;

                const result = await getContactsPage(
                    searchTerm,
                    currentOffset
                );

                const newContacts = result.data;

                if (reset) {

                    setContacts(newContacts);

                } else {

                    setContacts((previousContacts) => {

                        const combinedContacts = [
                            ...previousContacts,
                            ...newContacts,
                        ];

                        return Array.from(
                            new Map(
                                combinedContacts.map(
                                    (contact) => [
                                        String(contact.id),
                                        contact
                                    ]
                                )
                            ).values()
                        );
                    });
                }

                setPageOffset(
                    currentOffset + result.count
                );

                if (result.count < PAGE_SIZE) {

                    setHasMore(false);

                } else {

                    setHasMore(true);
                }

                if (
                    reset &&
                    newContacts.length === 0
                ) {

                    Alert.alert(
                        'Sem contatos',
                        searchTerm.trim()
                            ? 'Nenhum contato encontrado para essa busca.'
                            : 'Nenhum contato encontrado.'
                    );
                }


            } catch (error) {

                console.error(
                    'Erro ao carregar contatos:',
                    error
                );

                if (
                    error.message === 'PERMISSION_DENIED'
                ) {

                    Alert.alert(
                        'Permissão Negada',
                        'Permissão para acessar contatos foi negada.'
                    );

                } else {

                    Alert.alert(
                        'Erro',
                        'Ocorreu um erro ao carregar os contatos.'
                    );
                }


            } finally {

                setLoading(false);
            }

        },
        [
            loading,
            hasMore,
            pageOffset,
            search,
        ]
    );

    useEffect(() => {

        loadContacts(true);

    }, []);


    const handleLoadMore = () => {

        if (
            !loading &&
            hasMore
        ) {

            loadContacts(false);
        }
    };

    const handleSearchChange = (text) => {

        setSearch(text);
    };

    const handleSearch = () => {

        setContacts([]);
        setPageOffset(0);
        setHasMore(true);
        loadContacts(
            true,
            search
        );
    };

    const handleReload = () => {

        setSearch('');
        setContacts([]);
        setPageOffset(0);
        setHasMore(true);
        loadContacts(
            true,
            ''
        );
    };

    const renderItem = ({ item }) => {

        const fullName = [
            item.firstName,
            item.lastName,
        ]
            .filter(Boolean)
            .join(' ');


        return (

            <View style={styles.contactItem}>

                <Text style={styles.contactName}>
                    {fullName || 'Nome não informado'}
                </Text>


                {item.phoneNumbers?.map(
                    (phone, index) => (

                        <Text
                            key={`${item.id}-phone-${index}`}
                            style={styles.contactDetail}
                        >
                            📞 {phone.number}
                        </Text>

                    )
                )}

            </View>
        );
    };

    const renderFooter = () => {

        if (
            !loading ||
            contacts.length === 0
        ) {
            return null;
        }

        return (

            <View style={{ padding: 16 }}>

                <ActivityIndicator size="small" />

            </View>
        );
    };


    return (

        <View style={styles.container}>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar contato por nome..."
                value={search}
                onChangeText={handleSearchChange}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCorrect={false}
            />

            <View style={{ marginBottom: 10 }}>

                <Button
                    title="Buscar contatos"
                    onPress={handleSearch}
                />

            </View>

            <View style={{ marginBottom: 10 }}>

                <Button
                    title="Recarregar contatos"
                    onPress={handleReload}
                />

            </View>

            <FlatList

                data={contacts}
                keyExtractor={(item) =>
                    String(item.id)
                }
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                updateCellsBatchingPeriod={50}
                removeClippedSubviews={true}
                ListFooterComponent={renderFooter}

                ListEmptyComponent={() => {

                    if (loading) {

                        return (

                            <ActivityIndicator
                                size="large"
                                style={{
                                    marginTop: 30
                                }}
                            />

                        );
                    }


                    return (

                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 30
                            }}
                        >
                            Nenhum contato encontrado.
                        </Text>

                    );
                }}

            />

        </View>
    );
};


export default ContatosScreen;