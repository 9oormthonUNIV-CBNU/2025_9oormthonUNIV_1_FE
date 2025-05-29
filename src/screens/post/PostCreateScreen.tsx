import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {colors} from '@/constants';

type Tag = '공부' | '자유' | '모집' | '정보';

export default function PostForm() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: Tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = async () => {
    if (!tag) {
      Alert.alert('알림', '태그를 선택해주세요.');
      return;
    }
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('알림', '본문을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://your-server.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tag, title, content}),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      Alert.alert('성공', '서버로 전송 완료!');

      setTag('');
      setTitle('');
      setContent('');
    } catch (error) {
      Alert.alert('오류', '서버 전송에 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && {backgroundColor: '#aaa'}]}
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.submitButtonText}>
            {loading ? '전송중...' : '완료'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>게시글 카테고리를 선택해주세요.</Text>
      <View style={styles.tagContainer}>
        {(['공부', '자유', '모집', '정보'] as Tag[]).map(t => (
          <TouchableOpacity
            key={t}
            style={[
              styles.tagButton,
              tags.includes(t) && styles.tagButtonSelected,
            ]}
            onPress={() => toggleTag(t)}
            disabled={loading}>
            <Text
              style={[
                styles.tagText,
                tags.includes(t) && styles.tagTextSelected,
              ]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={(styles.input, styles.titleArea)}
        placeholder="제목 입력"
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />

      <TextInput
        style={[styles.input, styles.contentArea]}
        placeholder="본문 입력"
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        editable={!loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    gap: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.GRAY_800,
    marginRight: 10,
    marginBottom: 10,
  },
  tagButtonSelected: {
    backgroundColor: colors.BLUE_400,
    borderColor: colors.BLUE_400,
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
  tagTextSelected: {
    color: 'white',
  },
  input: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.GRAY_600,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  titleArea: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.BLACK,
  },
  contentArea: {
    height: '50%',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: colors.GRAY_400,
  },
  submitButton: {
    paddingVertical: 12,
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.GREEN,
    fontSize: 16,
  },
});
