import React, { useState } from 'react'
import Modal1 from '../DIsplay/Modal/Modal1'
import Button1 from '../form/Button1';

export default function LearnMoreButton(props) {
  const {label,component,buttonClassName,...restProps} = props;
  const [open,setOpen] = useState(false)
  return (
    <div>
      <Button1 variant='outlined' {...restProps} className={' '+buttonClassName} onClick={() => setOpen(true)}>{label || "Learn more"}</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-4 sm:p-10 text-start max-w-[700px]'>
          {!component && <h3 className='pb-4'>Header Title</h3>}
          {(component && React.cloneElement(component,{setOpen})) || `
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
