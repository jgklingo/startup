# Notes

## Git
- Use git diff to see the differences between commits
- Reference a branch *n* commits ago with *branch*~*n*
- Forking is like cloning a repo except it copies it to your GitHub instead of your local machine

## deployFiles.sh
- Host argument must be of the format "domain.tld" or just the ip address.

## HTML
- Span is inline version of div, used to separate a section of content
- You are not required to have a form element to use input elements. The form element was more common before JavaScript
- Input elements can have a required attribute. Many types of input element also have input validation
    - The pattern attribute can also be used to set a regex
- The label element has a for attribute where the id of the element it is to be bound to goes
- The value attribute allows you to set the default value
- `<hr>` draws a line across the screen
- `<textarea>` creates a paragraph input field
    - Has a `rows` and `cols` attribute to set default size, but can be resized
- `<a href="">text</a>` can be used to create a link that doesn't go anywhere

## CSS
- Styles cascade and the lowest place a style is defined is where it's taken from
- Create a CSS class with .name
- You can style only certain element types with a class with element.name
- Combinators allow you to style elements with certain relationships
    - For example, section h2 styles any h2s that are descendants of a section
- You can style a specific HTML element with #id
- Attribute selectors allow you to style elements based on their attributes (ex: href)
- Pseudo selectors allow you to style an element when certain actions are performed (ex: mouseover)
- For sized attributes, there are a plethora of units you can use to proportionally scale your page
- @font-face allows the import of fonts
- Have a main.css for general styling and other .css files for individual pages and elements that require a lot of styling