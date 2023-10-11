import { Button } from '@mui/material'
import React, { useState } from 'react'
import Modal1 from '../DIsplay/Modal/Modal1'

export default function LearnMoreButton(props) {
  const {label,component,buttonClassName,...restProps} = props;
  const [open,setOpen] = useState(false)
  return (
    <div>
      <Button variant='outlined' {...restProps} className={'!capitalize '+buttonClassName} onClick={() => setOpen(true)}>{label || "Learn more"}</Button>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-4 max-w-[500px]'>
          {component || `
            Lorem ipsum dolor sit amet consectetur. Hendrerit enim tellus donec ac est sed sed habitant mauris. Id placerat sed mattis magna penatibus in lobortis. Bibendum nulla euismod velit sagittis id id porttitor vivamus. Consequat magnis pellentesque condimentum pellentesque non tellus semper consequat. Faucibus dolor at porttitor nibh nulla. Tempus lobortis vulputate eu elementum non at lorem. Diam ipsum vulputate lacinia mattis augue pellentesque.
            Integer donec id egestas velit amet et. Pharetra at purus nibh non volutpat. Commodo leo rhoncus facilisi ultricies vel dui euismod pellentesque ac. Lacus id ac vulputate commodo volutpat viverra. Netus posuere ornare odio arcu. Penatibus nullam ut pulvinar fringilla mauris. Tincidunt dignissim diam odio vitae. Dignissim amet nascetur nunc turpis mauris risus nulla. Euismod mattis sagittis dui condimentum libero quis nec non sit.
            Vestibulum praesent scelerisque cras aliquam platea. In purus massa at malesuada eget. Laoreet viverra feugiat nibh pulvinar at nec morbi ac consectetur. Sagittis mi a sed eget. Et placerat quam in aenean posuere diam vitae. Et turpis aenean egestas condimentum parturient. In id duis ligula consectetur vitae tortor vitae mattis. Volutpat ut phasellus fusce eget feugiat pellentesque fames. Sagittis at metus mattis donec blandit habitasse dolor. Etiam maecenas mauris laoreet volutpat eu ornare. Volutpat consequat id facilisis molestie lorem. In duis habitasse viverra viverra pharetra neque eget.

            Lorem ipsum dolor sit amet consectetur. Hendrerit enim tellus donec ac est sed sed habitant mauris. Id placerat sed mattis magna penatibus in lobortis. Bibendum nulla euismod velit sagittis id id porttitor vivamus. Consequat magnis pellentesque condimentum pellentesque non tellus semper consequat. Faucibus dolor at porttitor nibh nulla. Tempus lobortis vulputate eu elementum non at lorem. Diam ipsum vulputate lacinia mattis augue pellentesque.
            Integer donec id egestas velit amet et. Pharetra at purus nibh non volutpat. Commodo leo rhoncus facilisi ultricies vel dui euismod pellentesque ac. Lacus id ac vulputate commodo volutpat viverra. Netus posuere ornare odio arcu. Penatibus nullam ut pulvinar fringilla mauris. Tincidunt dignissim diam odio vitae. Dignissim amet nascetur nunc turpis mauris risus nulla. Euismod mattis sagittis dui condimentum libero quis nec non sit.
            Vestibulum praesent scelerisque cras aliquam platea. In purus massa at malesuada eget. Laoreet viverra feugiat nibh pulvinar at nec morbi ac consectetur. Sagittis mi a sed eget. Et placerat quam in aenean posuere diam vitae. Et turpis aenean egestas condimentum parturient. In id duis ligula consectetur vitae tortor vitae mattis. Volutpat ut phasellus fusce eget feugiat pellentesque fames. Sagittis at metus mattis donec blandit habitasse dolor. Etiam maecenas mauris laoreet volutpat eu ornare. Volutpat consequat id facilisis molestie lorem. In duis habitasse viverra viverra pharetra neque eget.
          `}
        </div>
      </Modal1>
    </div>
  )
}
