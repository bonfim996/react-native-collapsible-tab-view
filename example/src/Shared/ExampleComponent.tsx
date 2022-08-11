import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import {
  Tabs,
  CollapsibleRef,
  CollapsibleProps,
} from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import Contacts from './Contacts'
import { HEADER_HEIGHT } from './Header'
import SectionContacts from './SectionContacts'

type Props = {
  emptyContacts?: boolean
  hideArticleTab?: boolean
} & Partial<CollapsibleProps>

const Example = React.forwardRef<CollapsibleRef, Props>(
  ({ emptyContacts, ...props }, ref) => {
    return (
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} {...props}>
        {props.hideArticleTab ? (
          <Tabs.Tab name="article" label="Article">
            <Article />
          </Tabs.Tab>
        ) : null}
        <Tabs.Tab
          rightIcon={{
            icon: (
              <Ionicons name="md-checkmark-circle" size={32} color="green" />
            ),
          }}
          name="albums"
          label="Albums"
        >
          <Albums />
        </Tabs.Tab>
        <Tabs.Tab
          rightIcon={{
            icon: (
              <Ionicons name="md-checkmark-circle" size={16} color="green" />
            ),
            onPress: () => console.log('Hello world!'),
          }}
          name="contacts"
          label="Contacts"
        >
          <Contacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
        <Tabs.Tab name="ordered" label="Ordered">
          <SectionContacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example
