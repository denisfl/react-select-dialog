## Project description

This is a test task. The task description can be found at this [link](https://www.figma.com/file/n4G119zrMTIJhrY5Nlub8v/UI-Test-Task?node-id=0%3A1&t=2Gx8R7py01pXLUgq-1).

I consider the current task as a project. Any project, whether it's long-term or short-term, has a basic minimum of features that need to be implemented and more extensive functionality. A week is allocated for the completion of this task. However, it's also necessary to take into account the free time that the developer is willing to invest in the development.

Considering the above, I decompose the task into small subtasks.

## History

### Jun 05, 2024

First and foremost, I want to focus on preparing the environment and creating the markup. As a result, I need to get a ready-made set of components and a general layout. Visually, all components should be in their places.

Visually, the following elements can be identified:

- Button
- Checkbox
- Selected item component
- Search
- Dropdown list with filters
- Modal window

### Jun 06, 2024

The task for today involves improvements: it is necessary to move all the logic into a modal window. We need to add filtering through the search bar. At this stage, it is enough for us to use useState for storing local data. In future versions or with further complexity, we can add a separate store, for example, Mobx. But at this stage, we can do without it.

### Jun 07, 2024

I hope you love tests as much as I do :) I love testing, it helps to find bottlenecks. That's why I added Playwright for testing. Honestly, this was my first experience using Playwright. I've used Cypress a lot in the past. But today I decided to try something new. I liked the result. Playwright seems a bit more convenient, faster, and more informative.

### Jun 08, 2024

I checked the code one more time and added small fixes. Now the result is available by the link https://react-select-dialog.vercel.app/
