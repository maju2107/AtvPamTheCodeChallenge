import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    list: {
        marginTop: 20,
    },

    contactItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    contactDetail: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },

    searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
},
});