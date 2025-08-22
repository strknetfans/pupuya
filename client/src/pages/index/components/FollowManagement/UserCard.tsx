import React, { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import { FollowUser } from '../../../../types'
import { formatNumber } from '../../../../utils/textUtils'
import './UserCard.less'

interface UserCardProps {
  user: FollowUser
  onToggleFollow: (user: FollowUser) => void
}

const UserCard: FC<UserCardProps> = memo(({ user, onToggleFollow }) => {
  const handleFollowClick = () => {
    onToggleFollow(user)
  }

  return (
    <View className="user-card">
      <View className="user-card__avatar">
        <Image 
          src={user.avatar} 
          className="user-card__avatar-img"
          mode="aspectFill"
        />
      </View>
      
      <View className="user-card__info">
        <View className="user-card__name-row">
          <Text className="user-card__name">{user.name}</Text>
          {user.isFollowing && (
            <Text className="user-card__following-tag">已关注</Text>
          )}
        </View>
        
        {user.bio && (
          <Text className="user-card__bio">{user.bio}</Text>
        )}
        
        <View className="user-card__stats">
          <Text className="user-card__stat">
            ❤️ {formatNumber(user.followersCount)} 粉丝
          </Text>
          <Text className="user-card__stat">
            📝 {formatNumber(user.postsCount)} 作品
          </Text>
        </View>
      </View>
      
      <View className="user-card__action">
        <Button
          type={user.isFollowing ? 'default' : 'primary'}
          size="small"
          onClick={handleFollowClick}
          className="user-card__follow-btn"
        >
          {user.isFollowing ? '取消关注' : '+ 关注'}
        </Button>
      </View>
    </View>
  )
})

UserCard.displayName = 'UserCard'

export default UserCard