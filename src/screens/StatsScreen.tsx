import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMostCarried, fetchItemById, fetchInkStats } from '../db/database';
import { getItemLabel } from '../config/itemTypes';

type RankedRow = {
  rank: number;
  item_id: string;
  item_type: string;
  days_carried: number;
  label: string;
};

function sinceDate30() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
}

export default function StatsScreen() {
  const [view, setView] = useState<'carry' | 'ink'>('carry');
  const [allTime, setAllTime] = useState(true);
  const [rows, setRows] = useState<RankedRow[]>([]);
  const [inkRows, setInkRows] = useState<{ ink: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (isAllTime: boolean) => {
    setLoading(true);
    const [raw, inks] = await Promise.all([
      fetchMostCarried(isAllTime ? undefined : { sinceDate: sinceDate30() }),
      fetchInkStats(),
    ]);

    const resolved = await Promise.all(
      raw.map(async (r, i) => {
        const item = await fetchItemById(r.item_id);
        const label = item ? getItemLabel(item) : r.item_id;
        return { rank: i + 1, ...r, label };
      })
    );

    setRows(resolved);
    setInkRows(inks);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load(allTime);
    }, [allTime, load])
  );

  return (
    <View style={styles.container}>
      {/* Top-level view toggle */}
      <View style={styles.viewToggle}>
        <Pressable
          style={[styles.viewPill, view === 'carry' && styles.viewPillActive]}
          onPress={() => setView('carry')}
        >
          <Text style={[styles.viewPillText, view === 'carry' && styles.viewPillTextActive]}>
            Most Carried
          </Text>
        </Pressable>
        <Pressable
          style={[styles.viewPill, view === 'ink' && styles.viewPillActive]}
          onPress={() => setView('ink')}
        >
          <Text style={[styles.viewPillText, view === 'ink' && styles.viewPillTextActive]}>
            Ink Usage
          </Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : view === 'carry' ? (
        <>
          <View style={styles.toggle}>
            <Pressable
              style={[styles.pill, allTime && styles.pillActive]}
              onPress={() => { setAllTime(true); load(true); }}
            >
              <Text style={[styles.pillText, allTime && styles.pillTextActive]}>All-time</Text>
            </Pressable>
            <Pressable
              style={[styles.pill, !allTime && styles.pillActive]}
              onPress={() => { setAllTime(false); load(false); }}
            >
              <Text style={[styles.pillText, !allTime && styles.pillTextActive]}>Last 30 days</Text>
            </Pressable>
          </View>
          {rows.length === 0 ? (
            <View style={styles.centered}>
              <Text style={styles.empty}>No carry data yet. Start logging!</Text>
            </View>
          ) : (
            <FlatList
              data={rows}
              keyExtractor={(r) => `${r.item_type}-${r.item_id}`}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.rank}>#{item.rank}</Text>
                  <Text style={styles.rowLabel} numberOfLines={1}>{item.label}</Text>
                  <Text style={styles.days}>{item.days_carried}d</Text>
                </View>
              )}
            />
          )}
        </>
      ) : (
        // Ink usage
        inkRows.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.empty}>
              No ink changes logged yet.{'\n'}Add a log entry with type "Ink Change" and put the ink name in the notes field.
            </Text>
          </View>
        ) : (
          <FlatList
            data={inkRows}
            keyExtractor={(r) => r.ink}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <Text style={styles.rowLabel} numberOfLines={1}>{item.ink}</Text>
                <Text style={styles.inkCount}>{item.count}×</Text>
              </View>
            )}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewToggle: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  viewPill: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: '#fff' },
  viewPillActive: { backgroundColor: '#4a90e2' },
  viewPillText: { color: '#4a90e2', fontWeight: '600', fontSize: 14 },
  viewPillTextActive: { color: '#fff' },
  toggle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pill: { flex: 1, paddingVertical: 7, alignItems: 'center', backgroundColor: '#f5f5f5' },
  pillActive: { backgroundColor: '#e8f0fc' },
  pillText: { color: '#666', fontWeight: '500', fontSize: 13 },
  pillTextActive: { color: '#4a90e2', fontWeight: '700' },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  empty: { color: '#888', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  rank: { fontSize: 14, fontWeight: '700', color: '#aaa', width: 32 },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: '600' },
  days: { fontSize: 14, color: '#4a90e2', fontWeight: '600' },
  inkCount: { fontSize: 14, color: '#e8943a', fontWeight: '600' },
});
