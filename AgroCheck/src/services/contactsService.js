import  React from 'react';
import * as Contacts from 'expo-contacts/legacy';

const PAGE_SIZE = 50;

export const requestContactsPermission = async () => {

    const { status } = await Contacts.getPermissionsAsync();
    if (status === 'granted') {
        return true;
    }

    const permission =await Contacts.requestPermissionsAsync(); 
    return permission.status === 'granted';
};

export const removeDuplicates = (contactList) => {
    return Array.from(
        new Map(
            contactList.map((contact) => [
                String(contact.id),
                contact
            ])
        ).values()
    );
};

export const getContactsPage = async ( searchTerm = '', pageOffset = 0) => {

    const hasPermission =
        await requestContactsPermission();

    if (!hasPermission) {

        throw new Error('PERMISSION_DENIED');
    }

    const { data } =
        await Contacts.getContactsAsync({

            fields: [ Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers,],
            name: searchTerm.trim(),
            pageSize: PAGE_SIZE,
            pageOffset: pageOffset,
        });

    return {
        data: removeDuplicates(data),
        count: data.length,
        pageSize: PAGE_SIZE,
    };
};

export { PAGE_SIZE };