/**

STONE RAIDER II

Copyright 2017
Steven Goodwin. 

This file is released under the GNU General Public License Version 3.

Please see the licensing conditions for details.

The latest version is generally available at:
	https://github.com/marquisdegeek/stoneraider

Play it at:
	https://marquisdegeek.com/code_stoneraider
*/

var gLevels = [
// cave01.dat
{ bonus: 100, points:25, diamonds: 8, map:
"########################################" + 
"#.o.....xM o...ox  M oox..o...ox..o...o#" + 
"#......oxo......x.ooo..xo....o.xo......#" + 
"#..o....x....o..x......x.o.....x...o.o.#" + 
"#o       o     o*        o     o       #" + 
"#....o..x....o..xoo    x.....o.x....o..#" + 
"# M....ox..o....xo.   ox...o.o*x..o....#" + 
"#  *..ooxo......xo.  .oxo....o.xo....oo#" + 
"#xxxxxxxxxxxxxxxxxx oxxxxxxxxxxxxxxxxxx#" + 
"#......ox.....o.xo.  ..xo....o.x...o.o.#" + 
"#.o.o...xo.o....x..   .x..o....x.o.o.o.#" + 
"#...o...x....o..x.     x...o..ox.....o.#" + 
"#      o      o o             o      . #" + 
"#o......x..o...oxo   .ox.....oox...o.. #" + 
"#..o..o.x.o.o...x.   oox.o.o...x.oo*..M#" + 
"#.o.....x.....o.x.  o..xo......x.....o #" + 
"#xxxxxxxxxxxxxxxxxx .xxxxxxxxxxxxxxxxxx#" + 
"#o..o...x..o....x.o ...x.o.....xoo..M  #" + 
"#o.....ox...o.ooxo. o.ox.o..o.ox..o ...#" + 
"#.......xo......x.. ..ox...o...x......o#" + 
"#        o          o   *  o   oo  o  *#" + 
"#o.....ox...o...x......x.... .ox. ....o#" + 
"#.......xo.oo...x.po.ooxo.o....x.oo..o.#" + 
"#M  *o..x...*..ox.!....x...o..ox.......#" + 
"########################################" + 
""}, 
// cave02.dat
{ bonus: 75, points:8, diamonds: 35, map:
"########################################" + 
"#.o......ooo.......o....o*o....o.......#" + 
"#oo.o....o*oo...o..x xxxx.x..o.o..o....#" + 
"#.p......oooo.xxx. x..  .oo.xx.x..xx..*#" + 
"#.xxx....ooo....o  x.o..oxx.x..o.o....o#" + 
"#.............o.*o x.o.....*x.xx.xo..*.#" + 
"#............o. xx. ox.xxxxxx.**oooo.x #" + 
"#...o.........  o.o .x..   .xxxxxxoo.x #" + 
"#.o.x.........o.xxx. x... .o.....oooox #" + 
"#...x......* .. .  o xo.  o.o...oo.... #" + 
"#o..x.o....x .ooo ...xo... .xo.o.....o*#" + 
"#.*.x.....ox ..*.. ooxo*..x xoo...xxxxx#" + 
"#..ox..........o...o*x.*..x*x..o....o .#" + 
"#o..xo......  .o.o...x..xxxxxo...o..o. #" + 
"#.. ........ . .o....x..o..o..o.o.oo.o.#" + 
"#... .o..o. .o. o....x..oo..o.. * .....#" + 
"#    .x.......  .....x*......   .  .o.o#" + 
"#..  .x....o. .....o.xxxx....      ....#" + 
"#.... x.......o.o......xo...   o    .o.#" + 
"#o  . xo...oo..........x.*..        ...#" + 
"#..  .......*xxxxx..o..  ...        ...#" + 
"#.... ...o..ox.A x....o  ....       ..o#" + 
"#.*.  ........oooo..oo. x.... xxx x ...#" + 
"#*.o......*..........*o *o....o*    ...!" + 
"########################################" + 
""}, 
// cave03.dat
{ bonus: 200, points:4, diamonds: 105, map:
"########################################" + 
"#......oooooooooooooooooooooooooo......#" + 
"#o....................................o#" + 
"#..................ss..................#" + 
"#.x....xossxooooooooooooooooxooox....x.#" + 
"#.x....xsosx................xsosx....x.#" + 
"#.x....xsssx.x............x.xsssx....x.#" + 
"#.x....xsssx.x............x.xsosx....x.#" + 
"#.x....xosox.x............x.xsssx....x.#" + 
"#.x....xsssx.xxxxxxxxxxxxxx.xsosx....x.#" + 
"#.x....xsosx........!.......xssox....x.#" + 
"#.x....xossx................xossx....x.#" + 
"#.x....xssox................xsssx....x.#" + 
"#.x....xossx................xosox....x.#" + 
"#.x....xssox................xssox....x.#" + 
"#.x....xoosx................xssox....x.#" + 
"#*x....xssox................xsoox....x*#" + 
"#*x....xsosx................xooox....x*#" + 
"#xx....xx.xx................xx.xx....xx#" + 
"#     p                                #" + 
"#                                      #" + 
"#                                      #" + 
"#                                      #" + 
"#                                      #" + 
"########################################" + 
""}, 
// cave04.dat
{ bonus: 100, points:15, diamonds: 20, map:
"########################################" + 
"#......x...x....................xo.....#" + 
"#......x...x.xx..x.xxx....x.xxx.xo.....#" + 
"#..!...x..ox.x.x.x.x......x..x..x....o.#" + 
"#......x.o.x.x.x.x.xxx.xx.x..x..x....p.#" + 
"#......x...x.x.x.x.x.x....x..x..x......#" + 
"#......x..ox.xx..x.xxx....x..x..x....o.#" + 
"#......x...x....................x......#" + 
"#......xo..x.xxxxxxxxxxxxxxxxxx.x......#" + 
"#......x..ox.o*oo***oooo*oooo*o.x..oooo#" + 
"#......x...x.*oooo***ooo*oo*ooo.x......#" + 
"#MMMMMox...x.oo*oooo*oooooooo**.x......#" + 
"#......x...x.o*o**ooo****o*o**o.x*.....#" + 
"#......x..ox.oooo*o*oo*oo**o*oo.x......#" + 
"#......x...x.oo*oooooo*oooooooo.x......#" + 
"#......x...x....................xo...o.#" + 
"#......x...x....................xo.....#" + 
"#......x...x....................x.o....#" + 
"#......x..xxxxxxxxxxxxxxxxxxxxxxx......#" + 
"#......x...   .M    .     .     .......#" + 
"#......x...   .     .     .     .......#" + 
"#......x...   .     .M    .     .......#" + 
"#..... o...M  .     .     .M    ......o#" + 
"#......x...   .     .  o  .     .......#" + 
"########################################" + 
""}, 
// cave05.dat
{ bonus: 100, points:30, diamonds: 5, map:
"########################################" + 
"#.................x.............oo.....#" + 
"#.................x....................#" + 
"#.................x.... M M M M M......#" + 
"#.................x.... ......## ......#" + 
"#.................x.... ......##M......#" + 
"#s................x.... ...o.... ......#" + 
"#.................x.... ........M......#" + 
"#.................x.... ........ ......#" + 
"#.................p.... ........M......#" + 
"#.................x.... ........ ......#" + 
"#.................x.... ........M......#" + 
"#xxxxxxxxxxxxxxxxxx....          ......#" + 
"#.oo......o.o.....x....................#" + 
"#.................x....................#" + 
"#.....*.*...o..o..x....................#" + 
"#..o..............xxxxxxxxxxxxxxxxxx...#" + 
"#.........o....o..x..........o.........#" + 
"#......o..........x..o...........o.o...#" + 
"#.........*..o....xo...o.....o.o.....o.#" + 
"#.................x.....o..o.....o.....#" + 
"#.....o.....o....ox..o.oooo............#" + 
"#.*...............x......*...o......o..#" + 
"#.................x.............o......#" + 
"#########################!##############" + 
""}, 
// cave06.dat
{ bonus: 100, points:10, diamonds: 60, map:
"########################################" + 
"# A  A  A o.................o..........#" + 
"# ..*...o .............................#" + 
"#Ao..o*.. .............................#" + 
"# .o..... ............ M...............#" + 
"# ....... ......o.....  ....p....  A ..#" + 
"#         .............................#" + 
"#.............   o.....................#" + 
"#o....o..xxxoxxxxx.x.. M...............#" + 
"#........x..o..**x*x..  ...............#" + 
"#........x*...*o.x.x.............  A ..#" + 
"#.o......x..*....x x...................#" + 
"#........xo ....*x x...................#" + 
"#. . . ..x...o..ox x...................#" + 
"#. . . ..x..o...*x xxxxx.x.............#" + 
"#. . . ..x..*o..ox x  o  x.......  A ..#" + 
"#. . .  .xo...o.*x x  .  x.............#" + 
"#. . . ..x.....*.x x     x.............#" + 
"#. .   ..x*.o*.o.x x     x.............#" + 
"#.A. . ..xo...o..x x    Ax.............#" + 
"#. . .  .x.*...*.x x.....x......o......#" + 
"#. . . ..x.......x x.....x.............#" + 
"#    . ..x..o...*xAx.....x..o..........#" + 
"! o. . ..x....o..x x.....x.............#" + 
"########################################" + 
""}, 
// cave07.dat
{ bonus: 100, points:5, diamonds: 50, map:
"########################################" + 
"#...................oo..ox.............#" + 
"#..................o..oo.x...   A    ..#" + 
"#..   .   .   .....o.o..ox.............#" + 
"#..   .   .   ........o.ox.............#" + 
"#..   .   .   ...........x.............#" + 
"#.. *M. *M. *M......     x...   A    ..#" + 
"#................... ... x.............#" + 
"#................... ... x.............#" + 
"#..   .   .   ...... .o. x.............#" + 
"#..   .   .   ...... o.o x...   A    ..#" + 
"#..   .   .   ...... .p. x.............#" + 
"#.. *A. *A. *A...... o.x x.............#" + 
"#................... ... x.............#" + 
"#................... .o. x...   A    ..#" + 
"#................... ...Mx.............#" + 
"#................... ... x.............#" + 
"#...................     x.............#" + 
"#........................x.............#" + 
"#........................x.............#" + 
"#........................x.............#" + 
"#........................x.............#" + 
"#........................x.............#" + 
"#........................x.............#" + 
"###############!########################" + 
""}, 
// cave08.dat
{ bonus: 100, points:5, diamonds: 70, map:
"########################################" + 
"#...o..........o.............o.........#" + 
"#.p......o...................o.........#" + 
"#.................o....................#" + 
"#o.................................o...#" + 
"#.....................................o#" + 
"#........o.............o...............#" + 
"#...  ........  ........  ...o.o..  ...#" + 
"#... A........ A........ A........ A...#" + 
"#...............o....o.................#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................#" + 
"#...MA........MA........MA........MA...#" + 
"#...oo........oo........oo........oo...#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................#" + 
"#......................................!" + 
"#......................................#" + 
"########################################" + 
""}, 
// cave09.dat
{ bonus: 75, points:50, diamonds: 2, map:
"########################################" + 
"#.............x ..o.......... .........#" + 
"#.M M     ....x. ....................o #" + 
"#.............x .......o.....o...o.....#" + 
"#.......o.....x.  ...........o....... .#" + 
"#.............x  o...o................ #" + 
"#.M M     ....x. . ....................#" + 
"#.............xo.  .               ....#" + 
"#.....o.......x.. ..M  M  M M  M M ..o.#" + 
"#.............x   ..  *.........*  ....#" + 
"#.............x..o..M ...........M .. .#" + 
"#.............x.....  ...........  ....#" + 
"#.p...........x.....  ...........M ..o.#" + 
"#............sx.....M ...........  ... #" + 
"#xxxxxxxxxxxxxx.....  ...........  ....#" + 
"#..............o....M ...........M ....#" + 
"#....o........... ..  ...........  ...o#" + 
"#................ ..M xxxxx.xxxxxM ....#" + 
"#..... ........   ..      x.xM     ... #" + 
"#...... o. ... .....M M  Mx.x M M M....#" + 
"#...   ....  ..o...xxxxxxxx.xxxxxxxx. .#" + 
"#...... ..... ........... o.  . ...o . #" + 
"#.o...  ..   ..............   ......   #" + 
"#.............. ........o   .......    !" + 
"########################################" + 
""}, 
// cave10.dat
{ bonus: 125, points:20, diamonds: 14, map:
"########################################" + 
"#.. ...oM o*...o     .oo*.  ..o..o     #" + 
"#o..o..o...  ..... ....o.. .o. . . ... #" + 
"#p.. ..o.... . *M...o..o.  ... ...     #" + 
"#################################. . ..#" + 
"#   o...o...o   o   o....*  ..o #.M..*.#" + 
"#. ............ . . ....... . . #...o..#" + 
"#......ooo  ..o   .   M  .oo..o #.. .  #" + 
"#o.... ######################.o.#.o  ..#" + 
"#oo... #M.o.... ..  .o    oo#.o.#...  o#" + 
"#ooo . #o... ..oo .*.o.o..M!# o.#.... .#" + 
"#..... #..   ........oo...o.#.o.#o.o...#" + 
"#......#.*.#########.####oo##.o #.. .o #" + 
"#  . o.#ooo#o.o .  o  ...oo.#.o.#......#" + 
"# ..Mo*#ooo#.oo.. oooo  ....# *.#o.  oo#" + 
"#......#...# ....oo.ooo.....#o..#... .o#" + 
"#.M   .#..o##################...# o. ..#" + 
"#M ..  #..ooooo.........o..   .o# .. ..#" + 
"# .*.. #..ooooo.    o .ooooo...o#....* #" + 
"#M ..  #.ooooooo.. ..*o......o.o#  .o.M#" + 
"#oM M .xxxxxo####################   .  #" + 
"#......o....... ... o  .o.. M  ..M     #" + 
"#o. ..   ... . .  M*.     ..ooo...  . .#" + 
"#*.  ......  . . ....  . .oo*...... ...#" + 
"########################################" + 
""}, 
// cave11.dat
{ bonus: 100, points:50, diamonds: 1, map:
"########################################" + 
"#......................o...      #.....#" + 
"#..........................# M   #.....#" + 
"#.........o................# ### #.....#" + 
"#..........................#     #.....#" + 
"#..........................#     #.....#" + 
"#..........................# ###M#.....#" + 
"#..........................#     #..p..#" + 
"#................o.........# M   #..!..#" + 
"#..................o.......# ### #.....#" + 
"#o...ooooooooo.............#     #.....#" + 
"#....oMMMMMMMo.............#     #.....#" + 
"#....oMMMMMMMo.............# ###M#.....#" + 
"#....oMMMMMMMo............o#     #.....#" + 
"#....oMMMMMMMo.............# M   #.....#" + 
"#....oMMMMMMMo....o........# ### #.....#" + 
"#....oMMMMMMMo.............#     #.....#" + 
"#....oMMM*MMMo.............#     #.....#" + 
"#....ooooooooo.............# ###M#.....#" + 
"#..........................#     #.....#" + 
"#..........................# M   #.....#" + 
"#.....o................o...# ### #.....#" + 
"#..........................#     #.....#" + 
"#.........................o#o     .....#" + 
"########################################" + 
""}, 
// cave12.dat
{ bonus: 75, points:20, diamonds: 25, map:
"########################################" + 
"#......................................#" + 
"#....oo......o....o...............o....#" + 
"#.o...................o.....o..........#" + 
"#..........o.......oo..................#" + 
"#.....................................o#" + 
"#..........                  ...o......#" + 
"#.....o.... xxxxxxxxxxxxxxxx ..........#" + 
"#..o....... x              x ..........#" + 
"#........oo xM        A    x ..........#" + 
"#........o. x   .******.   x .........o#" + 
"#.......... xM  .******.   x ........o.#" + 
"#.......... x   x******x   x .....o....#" + 
"#..o......o xM  x******x   x .....o....#" + 
"#.......... x   xxxxxxxx   x ..........#" + 
"#.....o.... xM             x ..........#" + 
"#.......... x M M M M M M Mx ..........#" + 
"#.......... xxxxxxxxxxxxxxxx .......o..#" + 
"#..........           M      .o........#" + 
"#...o.....o.........o............o.....#" + 
"#...................p......o...........#" + 
"#.............o........................#" + 
"#.o.....o.....o.........o..........o...#" + 
"#.............o.....!o.................#" + 
"########################################" + 
""}, 
// cave13.dat
{ bonus: 120, points:5, diamonds: 50, map:
"########################################" + 
"#..............x......................s#" + 
"#. A A A A A  .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#. .......... .x.......................#" + 
"#.A.......... .x.......................#" + 
"#.            .x..p....................#" + 
"#..............x.......................#" + 
"#......................................#" + 
"#......................................#" + 
"####################################!###" + 
""}, 
// cave14.dat
{ bonus: 200, points:15, diamonds: 10, map:
"########################################" + 
"#......................................#" + 
"#.                                    .#" + 
"#.            M  M  M  M  M  M  M     .#" + 
"#.  ....*......*....*...o.....*.....  .#" + 
"#.  .o......o.....o......  . .o...o.  .#" + 
"#.  ...  .............o..o . .o.....  .#" + 
"#.M ...  o.....o..o.......    ..o. .  .#" + 
"#.  .*.....o.o . ...o..o  .......o .  .#" + 
"#.  . ........   o.......o........o.  .#" + 
"#.M ...o.......o .....o. .*. o......  .#" + 
"#.  ....... .o .o..o...   .. . ....*  .#" + 
"#.  ......o. .  . ......      o.....  .#" + 
"#.M .....o*o   .o. ....o. .o ...o.o.  .#" + 
"#.  ..o...o. .o.. .......  .  ......  .#" + 
"#.  ...  ...o..  ...o....o.  ..o....  .#" + 
"#.M .o. o......  o..................  .#" + 
"#.  ..........o.....o.....o...ooo...  .#" + 
"#.  ..........................o*o...  .#" + 
"#.M ...o...*      ....M     ..ooo...  .#" + 
"#.  ........      ....      ........  .#" + 
"#.                ....                .#" + 
"#.M  M            ....M  M  M  M  M  M.#" + 
"#..................p...................#" + 
"###################!####################" + 
""}, 
// cave15.dat
{ bonus: 100, points:25, diamonds: 5, map:
"########################################" + 
"#.o....................      ......    #" + 
"#........    ..... .....   .  ......o..#" + 
"#...    .    ............  ........ ...#" + 
"#.... ...      ........................#" + 
"#..o. .o x xxxxxxxxxxxxxxxxxx x........#" + 
"#..M.....x x.......s........x x........#" + 
"#o o.o.  x x.xxxxxxxxxxxxxx.x x.....   #" + 
"#... ..o.x x.x o..........x.x x...o. !M#" + 
"#o .  o  x x.x............x.x x..oo.   #" + 
"#........x x.x............x.x x.ooo....#" + 
"#  .oo...x x.x....M.......x.x xoooo....#" + 
"# ......ox x.x.... .......x.x xoooo....#" + 
"#.*     .x xsx.... .M   ..xsx x*.......#" + 
"#o..o   .x x.x.... .......x.x x.ooo..oo#" + 
"#.....M.ox x.x............x.x x......o.#" + 
"#..o ....x x.x...... .....x.x x....ooo.#" + 
"# .......x x.x....p. .....x.x x.oooooo.#" + 
"#    o .ox x.x......M.....x.x x.......*#" + 
"#o.......x x.x......*.....x.x xo.oooo..#" + 
"#...   ..x x.xxxxxxxxxxxxxx.x xo..o....#" + 
"#...M  ..x x.......s........x xoooo....#" + 
"#... * ..x xxxxxxxxxxxxxxxxxx x........#" + 
"#.......ox                    x........#" + 
"########################################" + 
""}, 
// cave16.dat
{ bonus: 80, points:10, diamonds: 30, map:
"########################################" + 
"#.......................oo.............#" + 
"#..o...o...o....o......................#" + 
"#.......o.....................*.....o..#" + 
"#.............o....o..........o........#" + 
"#o....oxxxoxxxxoo...x..ox..............#" + 
"#*o....xo.M..*x.o.oox...x...o. . .....o#" + 
"#xoo...x......x..o*ox.o.x..... . ......#" + 
"#*xoo..x...o..x.....x.o.xo....M  *.....#" + 
"#..xoo.x.o...ox.....x..ox......o.....  #" + 
"#oo.xo.xo*o...x..*..x...x............M #" + 
"#....x.x.o..*.x..o..x*..x.....   ...o..#" + 
"#......x....o.x.....x...x..... *Mo....*#" + 
"#......xooo...x.....x...x.o........o...#" + 
"#..x.o*x*.....x.o..ox.o.x..............#" + 
"#..x.o.xxxo*xxx*....x...x...o........*.#" + 
"#..x.o.xo..o.ox..o..x...x....oo........#" + 
"#o.x.o.x...o..x...*.x.*.x......M   ....#" + 
"#o.x.o.x*.....x.....x...x.............o#" + 
"#Mox.o.x...*..x...o.x..ox............oo#" + 
"#o.x.o.x.o..o.x.....x.o.x..*...o.......#" + 
"#o*x.oox.....*x...o.x...x..............#" + 
"#..x...xooo...x...o.x...xoo............#" + 
"#*px...x**....x.o.*ox...x*............*!" + 
"########################################" + 
""}, 
// cave17.dat
{ bonus: 100, points:25, diamonds: 12, map:
"########################################" + 
"#...........p..........................#" + 
"#xxxxxxxxxxx xxxxxxxx..................#" + 
"#....*.............*x..................#" + 
"#.x x.xxxxxx xxxxxx.x..................#" + 
"#.xMx.x*.........*x.x..................#" + 
"#.xMx.x.xxxx xxxx.x.x..................#" + 
"#.xMx.x.x*.....*x.x.x..................#" + 
"#.xMx.x.x.xxMxx.x.x.x..................#" + 
"#.xMxMxMxMxMM xMxMxMx..................#" + 
"#.xMx x x x   x x x x..................#" + 
"#.xMx x x x   x x x x..................#" + 
"#.xMx.x.x.xxxxx.x.x.x..................#" + 
"#.x*x.x.x*.....*x.x.x..................#" + 
"#.x*x.x.xxxxxxxxx.x.x..................#" + 
"#.x*x.x*.........*x.x..................#" + 
"#.x*x.xxxxxxxxxxxxx.x..................#" + 
"#.x.x*.............*x..................#" + 
"#xx.xxxxxxxxxxxxxxxxx..................#" + 
"#...................x..................#" + 
"#...................x..................#" + 
"#xxxxxxxxxxxxxxxxxxxx..................#" + 
"#......................................#" + 
"#......................................!" + 
"########################################" + 
""}, 
// cave18.dat
{ bonus: 100, points:10, diamonds: 45, map:
"########################################" + 
"#................#.....        M       #" + 
"#................#..... .*.*.*.*.*.*.* #" + 
"#................#..... ############## #" + 
"#....*..*..*.....#.....                #" + 
"#....M..M..M.....#.....                #" + 
"#....M..M..M.....#....#.  #.  #.  #.  .#" + 
"#....M..M..M.....#....#*  #*  #*  #*  *#" + 
"#....M..M..M.....#oooo#.  #.  #.  #.  .#" + 
"#....M..M..M.....#....#*  #*  #*M #*  *#" + 
"#....M..M..M.....#ssss#.  #.  #.  #.  .#" + 
"#....M..M..M.....#....#*  #*M #*  #*  *#" + 
"#....o..o..o....p#    #.  #.  #.  #.  .#" + 
"#................#    #*  #*  #*  #*  *#" + 
"#................#    #.  #.  #.  #.  .#" + 
"#................#    #*  #*  #*  #*  *#" + 
"#................#    #.  #.  #.  #.  .#" + 
"#................#    #*  #*  #*  #*  *#" + 
"!...............o#    #.  #.  #.  #.M .#" + 
"#.................    #                #" + 
"#.................    #                #" + 
"#.................    # .*.*.*.*.*.*.*M#" + 
"#.................    # ############## #" + 
"#.................    #                #" + 
"########################################" + 
""}, 
// cave19.dat
{ bonus: 100, points:15, diamonds: 25, map:
"########################################" + 
"#.oo. .  o....  ...o p o.......       .#" + 
"#oo.. . . .... o...o   o....... .....M*#" + 
"!.* . ...o....o....o   o...o...       .#" + 
"#xxxxxxxxx .................  xxxxxxxxx#" + 
"#        .......... xxx    . ...o  o M #" + 
"#        .........  ...o ... ... ..o.*.#" + 
"#M*      o.....o....o...o  ...   . o...#" + 
"#xxxxxxxxx  ..xx.... o. .. .  xxxxxxxxx#" + 
"#...o.........xx....  . .. .o..o**    .#" + 
"#.o o.o.       o..oo  . .. ..........  #" + 
"#*.... ... o. ......... ..... .    o..M#" + 
"#.  M. .....  .....o...... o. . ...... #" + 
"#.. o. ....x........   o...o. . ......*#" + 
"# . .. ....x o  .....o ... .....  o...*#" + 
"# . .. ....x.. .M o......o......M ....o#" + 
"# .o.o . o x .. ......  oo. . .........#" + 
"# .... . . x .. .. o*. .*oo . .........#" + 
"#....... .  M.  ...... .oo.   o*      .#" + 
"#.....o..........o......o.. ....    oo.#" + 
"# xxxxx. .....  .....o .o.. . .. o  ox #" + 
"# .  .x.oooo.. .oo   .  ...o.. ......x #" + 
"# ..o.x ...*oo..oo............ ......x #" + 
"#o.. .  ....oo......os   .M    o.....x*#" + 
"########################################" + 
""}, 
// cave20.dat
{ bonus: 150, points:5, diamonds: 50, map:
"########################################" + 
"#.o..    o  o. o.o.p..o*xo..o o ox  *o.#" + 
"#..o.   .xx.x x.*o....xxx*..x.xx*x...x.#" + 
"#.ox... o*x x xooo..x*x  .  x.*..x.  *o#" + 
"#.x.o . .ox   x.*...xxx     xxxxxx  o.x#" + 
"#*x.xo.  .xx  x.......  xx  ..ooo o.x  #" + 
"#..*..    o*x x....... oo.  ..ooo.xo o.#" + 
"#xxxx .. .oox*x.oo.o.ooooo   .x.x .*.x #" + 
"#*ox* o. ... x  x*.x.o**oox   x.x  x   #" + 
"#x.xxxx .o.      x x.o*o*ox  xx*x  .o  #" + 
"#o...   o*o  o...x .*ooooox x.xxx   x. #" + 
"#oo..   .o.oxoo... .x...... .oo .  xxx #" + 
"#xo.. o  ..xoooo.  .x*   ...o*ooox....o#" + 
"#*x  o.oxo.xooooo..ooxxo   oooooox..o*o#" + 
"#o. xx...o.xoo.ooo.*oo*xo  ......xo ...#" + 
"#x. .oo*.o.x*........oxxxx    .. x.o  o#" + 
"#   oo...o..xx      oo....x  ...x. .  .#" + 
"#  .xx*..o...xo    xoo.ooo.x    x.     #" + 
"#....x..*o.xxxxo   x...o*o..x   ooo.o.o#" + 
"#.oo..xxxx...x.*x.x*...ooo..x. .xxx.x.x#" + 
"#.xx.o ..o.x.x....x.......o.ox ...x x..#" + 
"#.oo.x...x x.x*...x.......x.x     x x..#" + 
"#.xx.x..xx x.x....x.....xox.xooo x*. x.#" + 
"#.**.x.oo* x*x..........o..*x***.x*.x*.#" + 
"######!#################################" + 
""}, 
// cave21.dat
{ bonus: 80, points:20, diamonds: 15, map:
"########################################" + 
"#...........MMMMMMMMMMMMMMMM...........#" + 
"#..*...............*...........*.......#" + 
"#..#...............p...........#.......#" + 
"#.................# #..................#" + 
"#.................##!..................#" + 
"#...........*........*.................#" + 
"#...........#......*.#.................#" + 
"#...*..............#.......*...........#" + 
"#...#......................#...........#" + 
"#...........................*..........#" + 
"#...........................#..........#" + 
"#......*...........................*...#" + 
"#......#...........................#...#" + 
"#......*............*..................#" + 
"#......#......*.....#.......*..........#" + 
"#*............#............*#..........#" + 
"##....................*....#.........*.#" + 
"#.....................#....*.........#.#" + 
"#..........................#...........#" + 
"#....*..............................*..#" + 
"#....#..............................#..#" + 
"#.............*........................#" + 
"#.............#........................#" + 
"########################################" + 
""}, 
// cave22.dat
{ bonus: 150, points:25, diamonds: 15, map:
"########################################" + 
"#............o....o...o...............o#" + 
"#.p.......o..o....o.....o..............#" + 
"#............o...o.o...................#" + 
"#............o......o.o....o.......o...#" + 
"#.....................o...........o....#" + 
"#.........xxxxxxxo.xxxxxxx.......o.....#" + 
"#.........x.....xo.x.....x......o......#" + 
"#.........x.....x..x.....x.............#" + 
"#.........x.....x..x.....x.............#" + 
"#.ooo...o.x.....x..x.....x.............#" + 
"#.........x.....x..x.....x.............#" + 
"#.........x.....x..x.....xo.......oo...#" + 
"#.........x.....xoox.....x.o.....oooo..#" + 
"#.........x.o...x..x.....x.......oooo..#" + 
"#.........x.....x..x.....x.o.o....oo...#" + 
"#.........x.....x..x.....x.............#" + 
"#..o......xxxxxxx.oxxxxxxx.............#" + 
"#................... M   ..............#" + 
"#.............................oo.......#" + 
"#...o......   .   .   ................o!" + 
"#.......o..   .   .   .............o...#" + 
"#..........   .   .o  .................#" + 
"#..........M  .M  .ooM..o..............#" + 
"########################################" + 
""}, 
// cave23.dat
{ bonus: 100, points:5, diamonds: 120, map:
"##############################!#########" + 
"#oo**oooo*o*o.**oo**.....x**ooox**oo**o#" + 
"#o*o*oooo*o*oxoo*ooxoo.o*x*ooo*xoo***oo#" + 
"#*o*oo***o*o*xoo*o.xoo*o*xoo*.oxoo**ooo#" + 
"#oo***ooo***o...*oox***o.xooo*oxo***o*o#" + 
"#oo*o*****.o*xoo*ooxo*o.*xoo.oox***oo*o#" + 
"#**..*ooo*o*ox*o*ooxo*o.ox**o*.x**oooo*#" + 
"#*o**ooo...o*x.*..*xo.o. x*o*oox*oo*ooo#" + 
"#.o.oo**o*ooox.o*oox.*ooox*ooo*x*oooooo#" + 
"#*o*o..o.o*o*x.**..xo*.*oxoooo*x*oooooo#" + 
"#*o**o*oo*oo*.o.oo*x..*oox.....xo*oo**o#" + 
"#*..oo*o.****x*o.*.xoo .*......xoo*oo.*#" + 
"#xxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx.xxx#" + 
"#                x  x    x   x         #" + 
"#                   x    x x x  x      #" + 
"#              x         x x    x      #" + 
"#              xxx xxxx         x      #" + 
"#              x                x      #" + 
"#            x.xoxxxxxxxxxxxxxx.x      #" + 
"#            x.x....*...o..o..x.x      #" + 
"#            x.x.o.....*.....ox.x      #" + 
"#            x.x.ooo.......*..x..      #" + 
"#......#.......x.o.o.....o....x.x      #" + 
"#..............x..*o..p..*....x..      #" + 
"########################################" + 
""}, 
// cave24.dat
{ bonus: 150, points:5, diamonds: 50, map:
"########################################" + 
"#....................o...........o....o#" + 
"#..oo*o*o*o*oo...o...o....o............#" + 
"#..x....s....xp......o.............o...#" + 
"#..x.........x.........o...............#" + 
"#..x.........x.o.o..............o......#" + 
"#..x.........x.......o.......oo.o......#" + 
"#.ox.........x.......o.......ooo.o.....#" + 
"#..x.........x...............oooo......#" + 
"#..x.........x...........o....o........#" + 
"#..x.........x...oo...........*......o.#" + 
"#o.x.........x.........o      !xxxxxoo.#" + 
"#o.x.........x.......... .... xAAAAx...#" + 
"#..x..............o..... .... xAAAAx...#" + 
"#..x.........x.......... .... xAAAAx...#" + 
"#..x.x.x.x.x.x..........M.... xAAAAx...#" + 
"#..x         x.........o      xAAAAx...#" + 
"#..x         x.o..............xxxxxx..o#" + 
"#..x         x...................o.....#" + 
"#..x         xo.....o.......o..........#" + 
"#..x         x.........o............o..#" + 
"#..x         x.........................#" + 
"#...         ..........................#" + 
"#...         .................o........#" + 
"########################################" + 
""}, 
// cave25.dat
{ bonus: 150, points:15, diamonds: 22, map:
"########################################" + 
"#..xo.o.ox..o.oxo.o.oxo..o.xo...oxoo...#" + 
"#..x.....xo....xo.p..x...o.xo..o.x.....#" + 
"#..o...*o....o.*....oo.*.o.........oo*.#" + 
"#..xoo...x.....x.o...xo..o.xo....x....o#" + 
"#..x...o.xo.oo.x...o.xoo.oox..o.ox.o...#" + 
"#..xxx.xxxxx*xxxxx.xxxxx.xxxxx*xxxxx.xx#" + 
"#..xo..ooxo...oxo.o.oxo..o.xo....x...oo#" + 
"#..xoo...x..oo.x..o..x...o.x..o..x.o.o*#" + 
"#....oo..............o..o..oo...oo.....#" + 
"#.ox....oxoooooxo...ox...oox.....xo....#" + 
"#.oxo..oox*....x*o..oxo....x...o.x*o...#" + 
"#.oxxx*xxxxxoxxxxx.xxxxx.xxxxx.xxxxx.xx#" + 
"#.ox.o..ox....ox....ox*o..oxo...oxo..o.#" + 
"#.ox.....xo..o.xo..ooxo....xo..oox...o.#" + 
"#.*o.o.o.o..o.....o*.....oo..........o.#" + 
"#.*x.....x.....x.....xo...oxooo..x.o.o.#" + 
"#..xo.oo.xo..oox.o..oxoo...x*o..ox.o.o*#" + 
"#..xxxoxxxxx.xxxxx.xxxxx.xxxxx.xxxxx.xx#" + 
"#..xo...oxo..ooxo....xoo...x.....xo...o#" + 
"!..x.....xo.o..x..oooxoo.o.xo..o.x...o.#" + 
"#....o....o.......ooo.......oo...o.o...#" + 
"#..x..oooxo....xo....x...o.x.*..ox...oo#" + 
"#o.x....*xo..o.x....*x*.o.ox.o...xo..*.#" + 
"########################################" + 
""}, 
];
