import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@ui-kitten/components';

const StatusBarThemed = () => {
    const theme = useTheme()

    return (
        <StatusBar style="light" backgroundColor={theme['color-primary-default']} />
    )
}

export default StatusBarThemed