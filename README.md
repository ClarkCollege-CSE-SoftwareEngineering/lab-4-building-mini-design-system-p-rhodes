# CSE325 Lab 4 -- Parker Rhodes

## Reflections
**1.3 Explore What's Provided:** Organizing the colors by semantic meaning rather than by color meaning makes the code much more readable later on. If much time passes before we return to this code, we may have forgotten which colors were assigned to what and without the semantic approach, would likely have to go back and forth between the UI and the code which would decrease productivity

**2.3 Write Tests For Button:** If our team decided to increase all spacing by 2px, it would require only a change to the spacing.ts tokens file.

**3.3 Write Tests for Alert:** If you were to make a change to all buttons on the platform, you would only need to change the Button.tsx file. This should vastly reduce the time it takes to make large scale changes to a platform and therefore showcases Frost's point about atomic design and its value.

**4.2 Reflection Section Questions:** 
- The process of producing the Alert molecule is steamlined when much of the foundational components, the atoms, are already completed. This makes it easier to modify only certain sections of the Alert later if we wish to make a change, which showcases the value of atomic design.

- Design tokens help maintain consistency across all components because they allow us to configure a set of all baseline atoms that we wish to use, which can then be edited to make large scale changes to several molecules, and beyond, at once

- In order to add a dark mode to the system, I would need to go into the colors.ts file within src/Tokens and add a palette to use for the dark mode

**4.2 Key Concepts:** 
1. Atomic design makes the process of maintaining code for React based projects much easier as changes can deployed much faster by editing lower-tier components.

2. Viewing webapps as systems of components rather than systems of pages allows for much more scalability as many lower-level components can be reused in many areas, instead of designing each page on a case-by-case basis

3. One takeaway from the readings that I appreciated is, as Brad Frost says in Chapter 2 of Atomic Design: Atomic Design Methodology, 'atomic design applies to all user interfaces, not just web based ones'.
