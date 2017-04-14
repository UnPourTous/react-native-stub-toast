# react-native-stub-toast

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  
  
## Introduction 
A Toast component which can be called with static function but does not need to be added <Tosat /> every.

## Installation 
```
npm install @unpourtous/react-native-stub-toast --save
```

## Usage
First, add PopupStub as sibling node of you Root Node
``` js
export default class example extends Component {
  render () {
    return (
      <View style={styles.container}>
        {/* Your root node */} 
        <TouchableHighlight
          onPress={() => {
            // Step three: Use Toast with static function
            Toast.show('This is a Toast')
          }}>
          <Text>Show Toast</Text>
        </TouchableHighlight>
        
        {/* Step One: Add popup stub */} 
        <PopupStub ref={component => {
          this._popupStub = component
          // Step Two: Init toast with PopupStub ref
          Toast.init(this._popupStub)
        }} />
      </View>
    )
  }
}



```
