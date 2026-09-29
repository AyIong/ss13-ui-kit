# Creating custom icons

The following is the process to implement your own icon using an svg.

If you plan on making your own SVG, consider [Inkscape](https://inkscape.org/). It is free and pretty powerful for vector graphics.
Or you can use [Boxy SVG](https://boxy-svg.com/) as more easier alternative.

## Adding SVG to font

1. Get whatever SVG you plan on using and put it in the `custom` folder.
2. Give it a name, which will be used as icon name.
3. In VSCode, press `Ctrl + ~`, and write bun icons. Wait for it to comlpete.

Now your SVG will be able to be used as FontAwesome icons.

When you reference your icon that you prefix it with "tg-", otherwise it will not find it. For example, with an SVG named "prosthetic-leg.svg", you would reference it with `name="tg-prosthetic-leg"`.

Keep your SVG as simple as possible, the engine has trouble rendering SVGs that have a lot of little disconnected parts.
