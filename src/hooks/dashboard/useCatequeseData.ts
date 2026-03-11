import { useState, useCallback, useEffect, useMemo } from 'react';
import api from '@/lib/api';
import { CatechismClass, CatechismMetrics } from '@/types';

export const useCatequeseData = () => {
    const [classes, setClasses] = useState<CatechismClass[]>([]);
    const [metrics, setMetrics] = useState<CatechismMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<string>('all');

    const fetchData = useCallback(async (silent = false) => {
        if (!silent) {
            setLoading(true);
        }

        try {
            const metricsParams = selectedYear !== 'all' ? { params: { year: parseInt(selectedYear) } } : {};
            const [classesRes, metricsRes] = await Promise.all([
                api.get('/catechism'),
                api.get('/catechism/metrics', metricsParams)
            ]);
            setClasses(classesRes.data || []);
            setMetrics(metricsRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            if (!silent) {
                setLoading(false);
            }
        }
    }, [selectedYear]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const uniqueYears = useMemo(() =>
        Array.from(new Set(classes.map(c => c.year))).sort((a, b) => b - a),
        [classes]);

    const filteredClasses = useMemo(() =>
        selectedYear === 'all'
            ? classes
            : classes.filter(c => c.year === parseInt(selectedYear)),
        [classes, selectedYear]);

    return {
        classes,
        metrics,
        loading,
        selectedYear,
        setSelectedYear,
        fetchData,
        uniqueYears,
        filteredClasses
    };
};
