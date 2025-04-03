import { useState, useCallback } from 'react';

const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    // Функция для добавления нового уведомления
    const addNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now(); // Уникальный идентификатор для каждого уведомления

        setNotifications((prev) => [
            ...prev,
            { id, message, type }
        ]);

        // Удаление уведомления после указанного времени
        setTimeout(() => {
            removeNotification(id);
        }, duration);
    }, []);

    // Функция для удаления уведомления
    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    return {
        notifications,
        addNotification,
        removeNotification,
    };
};

export default useNotification;