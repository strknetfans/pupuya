import React, { FC, memo, useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import PlatformUtils from '../../../../utils/platform'
import './index.less'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagChange: (tags: string[]) => void
  className?: string
}

const TagFilter: FC<TagFilterProps> = memo(({
  tags,
  selectedTags,
  onTagChange,
  className = ''
}) => {
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(selectedTags)

  useEffect(() => {
    setLocalSelectedTags(selectedTags)
  }, [selectedTags])

  const handleTagClick = (tag: string) => {
    const newSelectedTags = localSelectedTags.includes(tag)
      ? localSelectedTags.filter(t => t !== tag)
      : [...localSelectedTags, tag]
    
    setLocalSelectedTags(newSelectedTags)
    onTagChange(newSelectedTags)
  }

  const isH5 = PlatformUtils.isH5()

  return (
    <View className={`tag-filter ${className} ${PlatformUtils.getPlatformClass()}`}>
      <ScrollView 
        className="tag-filter__scroll"
        scrollX
        showScrollbar={false}
      >
        <View className="tag-filter__container">
          {tags.map(tag => (
            <View
              key={tag}
              className={`tag-filter__tag ${
                localSelectedTags.includes(tag) ? 'tag-filter__tag--selected' : ''
              }`}
              onClick={() => handleTagClick(tag)}
            >
              <Text className="tag-filter__tag-text">{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
})

TagFilter.displayName = 'TagFilter'

export default TagFilter
