const tape = require('tape');
const mmlN = require("../app.js");

tape('Basic test: check MathMlNow with Euler\'s identity', function (t) {
    t.plan(1);

    const tex = 'e^{i\\pi}+1=0';
    const expectedOutput = `<svg height="53" width="195" aria-label="e Superscript i pi Baseline plus 1 equals 0"><switch><foreignObject requiredExtensions="http://www.w3.org/1998/Math/MathML" height="53" width="195"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" alttext="e Superscript i pi Baseline plus 1 equals 0"><mstyle mathsize="30pt">
  <semantics>
    <mrow>
      <msup>
        <mi>e</mi>
        <mrow>
          <mi>i</mi>
          <mi>&#960;<!-- &#960; --></mi>
        </mrow>
      </msup>
      <mo>+</mo>
      <mn>1</mn>
      <mo>=</mo>
      <mn>0</mn>
    </mrow>
    <annotation encoding="application/x-tex">e^{i\\pi}+1=0</annotation>
  </semantics>
</mstyle></math></foreignObject><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="195" height="53" viewBox="0 -1006.6 4774.3 1223.9" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title"><title id="MathJax-SVG-1-Title">e Superscript i pi Baseline plus 1 equals 0</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJMATHI-65" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path><path stroke-width="1" id="E1-MJMATHI-69" d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z"></path><path stroke-width="1" id="E1-MJMATHI-3C0" d="M132 -11Q98 -11 98 22V33L111 61Q186 219 220 334L228 358H196Q158 358 142 355T103 336Q92 329 81 318T62 297T53 285Q51 284 38 284Q19 284 19 294Q19 300 38 329T93 391T164 429Q171 431 389 431Q549 431 553 430Q573 423 573 402Q573 371 541 360Q535 358 472 358H408L405 341Q393 269 393 222Q393 170 402 129T421 65T431 37Q431 20 417 5T381 -10Q370 -10 363 -7T347 17T331 77Q330 86 330 121Q330 170 339 226T357 318T367 358H269L268 354Q268 351 249 275T206 114T175 17Q164 -11 132 -11Z"></path><path stroke-width="1" id="E1-MJMAIN-2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path><path stroke-width="1" id="E1-MJMAIN-31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path><path stroke-width="1" id="E1-MJMAIN-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path stroke-width="1" id="E1-MJMAIN-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJMATHI-65" x="0" y="0"></use><g transform="translate(466,412)"><use transform="scale(0.707)" href="#E1-MJMATHI-69" x="0" y="0"></use><use transform="scale(0.707)" href="#E1-MJMATHI-3C0" x="345" y="0"></use></g><use href="#E1-MJMAIN-2B" x="1438" y="0"></use><use href="#E1-MJMAIN-31" x="2439" y="0"></use><use href="#E1-MJMAIN-3D" x="3217" y="0"></use><use href="#E1-MJMAIN-30" x="4273" y="0"></use></g></svg></switch></svg>`;

    mmlN.MathMLNow(tex, {
        formatName: "TeX",
        minify: false,
        fontSize: 30
    }).then(result => {
        t.equal(result, expectedOutput);
    });
});

tape('Basic test: check MathMlNow with the Quadratic formula', function (t) {
    t.plan(1);

    const tex = 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}';
    const expectedOutput = `<svg height="68" width="227" aria-label="x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction"><switch><foreignObject requiredExtensions="http://www.w3.org/1998/Math/MathML" height="68" width="227"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" alttext="x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction"><mstyle mathsize="18pt">
  <semantics>
    <mrow>
      <mi>x</mi>
      <mo>=</mo>
      <mfrac>
        <mrow>
          <mo>&#8722;<!-- &#8722; --></mo>
          <mi>b</mi>
          <mo>&#177;<!-- &#177; --></mo>
          <msqrt>
            <msup>
              <mi>b</mi>
              <mn>2</mn>
            </msup>
            <mo>&#8722;<!-- &#8722; --></mo>
            <mn>4</mn>
            <mi>a</mi>
            <mi>c</mi>
          </msqrt>
        </mrow>
        <mrow>
          <mn>2</mn>
          <mi>a</mi>
        </mrow>
      </mfrac>
    </mrow>
    <annotation encoding="application/x-tex">x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}</annotation>
  </semantics>
</mstyle></math></foreignObject><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="227" height="68" viewBox="0 -1867.7 9267.9 2659.1" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title"><title id="MathJax-SVG-1-Title">x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJMATHI-78" d="M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"></path><path stroke-width="1" id="E1-MJMAIN-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path stroke-width="1" id="E1-MJMAIN-2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path><path stroke-width="1" id="E1-MJMATHI-62" d="M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"></path><path stroke-width="1" id="E1-MJMAIN-B1" d="M56 320T56 333T70 353H369V502Q369 651 371 655Q376 666 388 666Q402 666 405 654T409 596V500V353H707Q722 345 722 333Q722 320 707 313H409V40H707Q722 32 722 20T707 0H70Q56 7 56 20T70 40H369V313H70Q56 320 56 333Z"></path><path stroke-width="1" id="E1-MJMAIN-32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path><path stroke-width="1" id="E1-MJMAIN-34" d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z"></path><path stroke-width="1" id="E1-MJMATHI-61" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"></path><path stroke-width="1" id="E1-MJMATHI-63" d="M34 159Q34 268 120 355T306 442Q362 442 394 418T427 355Q427 326 408 306T360 285Q341 285 330 295T319 325T330 359T352 380T366 386H367Q367 388 361 392T340 400T306 404Q276 404 249 390Q228 381 206 359Q162 315 142 235T121 119Q121 73 147 50Q169 26 205 26H209Q321 26 394 111Q403 121 406 121Q410 121 419 112T429 98T420 83T391 55T346 25T282 0T202 -11Q127 -11 81 37T34 159Z"></path><path stroke-width="1" id="E1-MJSZ1-221A" d="M263 249Q264 249 315 130T417 -108T470 -228L725 302Q981 837 982 839Q989 850 1001 850Q1008 850 1013 844T1020 832V826L741 243Q645 43 540 -176Q479 -303 469 -324T453 -348Q449 -350 436 -350L424 -349L315 -96Q206 156 205 156L171 130Q138 104 137 104L111 130L263 249Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJMATHI-78" x="0" y="0"></use><use href="#E1-MJMAIN-3D" x="850" y="0"></use><g transform="translate(1628,0)"><g transform="translate(397,0)"><rect stroke="none" width="7121" height="60" x="0" y="220"></rect><g transform="translate(60,775)"><use href="#E1-MJMAIN-2212" x="0" y="0"></use><use href="#E1-MJMATHI-62" x="778" y="0"></use><use href="#E1-MJMAIN-B1" x="1430" y="0"></use><g transform="translate(2430,0)"><use href="#E1-MJSZ1-221A" x="0" y="94"></use><rect stroke="none" width="3569" height="60" x="1000" y="885"></rect><g transform="translate(1000,0)"><use href="#E1-MJMATHI-62" x="0" y="0"></use><use transform="scale(0.707)" href="#E1-MJMAIN-32" x="607" y="408"></use><use href="#E1-MJMAIN-2212" x="1105" y="0"></use><use href="#E1-MJMAIN-34" x="2106" y="0"></use><use href="#E1-MJMATHI-61" x="2606" y="0"></use><use href="#E1-MJMATHI-63" x="3136" y="0"></use></g></g></g><g transform="translate(3045,-687)"><use href="#E1-MJMAIN-32" x="0" y="0"></use><use href="#E1-MJMATHI-61" x="500" y="0"></use></g></g></g></g></svg></switch></svg>`;

    mmlN.MathMLNow(tex, {
        formatName: "TeX",
        minify: false,
        fontSize: 18
    }).then(result => {
        t.equal(result, expectedOutput);
    });
});

tape('Basic test: check MathMlNow with the Integral of the secant function', function (t) {
    t.plan(1);

    const tex = '\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)';
    const expectedOutput = `<svg height="89" width="260" aria-label="integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis"><switch><foreignObject requiredExtensions="http://www.w3.org/1998/Math/MathML" height="89" width="260"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" alttext="integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis"><mstyle mathsize="16pt">
  <semantics>
    <mrow>
      <msubsup>
        <mo>&#8747;<!-- &#8747; --></mo>
        <mn>0</mn>
        <mrow>
          <mi>&#960;<!-- &#960; --></mi>
                  <mo>/</mo>
          <mn>6</mn>
        </mrow>
      </msubsup>
      <mi>sec</mi>
      <mo>&#8289;<!-- &#8289; --></mo>
      <mrow>
        <mo>(</mo>
        <mi>y</mi>
        <mo>)</mo>
      </mrow>
      <mi mathvariant="normal">d</mi>
      <mo>&#8289;<!-- &#8289; --></mo>
      <mi>y</mi>
      <mo>=</mo>
      <mi>ln</mi>
      <mo>&#8289;<!-- &#8289; --></mo>
      <mrow>
        <mo>(</mo>
        <msqrt>
          <mn>3</mn>
        </msqrt>
        <msup>
          <mi>i</mi>
                  <mn>64</mn>
        </msup>
        <mo>)</mo>
      </mrow>
    </mrow>
    <annotation encoding="application/x-tex">\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)</annotation>
  </semantics>
</mstyle></math></foreignObject><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="63" viewBox="0 -1724.2 11961.7 2730.8" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title" y="13"><title id="MathJax-SVG-1-Title">integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJSZ2-222B" d="M114 -798Q132 -824 165 -824H167Q195 -824 223 -764T275 -600T320 -391T362 -164Q365 -143 367 -133Q439 292 523 655T645 1127Q651 1145 655 1157T672 1201T699 1257T733 1306T777 1346T828 1360Q884 1360 912 1325T944 1245Q944 1220 932 1205T909 1186T887 1183Q866 1183 849 1198T832 1239Q832 1287 885 1296L882 1300Q879 1303 874 1307T866 1313Q851 1323 833 1323Q819 1323 807 1311T775 1255T736 1139T689 936T633 628Q574 293 510 -5T410 -437T355 -629Q278 -862 165 -862Q125 -862 92 -831T55 -746Q55 -711 74 -698T112 -685Q133 -685 150 -700T167 -741Q167 -789 114 -798Z"></path><path stroke-width="1" id="E1-MJMATHI-3C0" d="M132 -11Q98 -11 98 22V33L111 61Q186 219 220 334L228 358H196Q158 358 142 355T103 336Q92 329 81 318T62 297T53 285Q51 284 38 284Q19 284 19 294Q19 300 38 329T93 391T164 429Q171 431 389 431Q549 431 553 430Q573 423 573 402Q573 371 541 360Q535 358 472 358H408L405 341Q393 269 393 222Q393 170 402 129T421 65T431 37Q431 20 417 5T381 -10Q370 -10 363 -7T347 17T331 77Q330 86 330 121Q330 170 339 226T357 318T367 358H269L268 354Q268 351 249 275T206 114T175 17Q164 -11 132 -11Z"></path><path stroke-width="1" id="E1-MJMAIN-2F" d="M423 750Q432 750 438 744T444 730Q444 725 271 248T92 -240Q85 -250 75 -250Q68 -250 62 -245T56 -231Q56 -221 230 257T407 740Q411 750 423 750Z"></path><path stroke-width="1" id="E1-MJMAIN-36" d="M42 313Q42 476 123 571T303 666Q372 666 402 630T432 550Q432 525 418 510T379 495Q356 495 341 509T326 548Q326 592 373 601Q351 623 311 626Q240 626 194 566Q147 500 147 364L148 360Q153 366 156 373Q197 433 263 433H267Q313 433 348 414Q372 400 396 374T435 317Q456 268 456 210V192Q456 169 451 149Q440 90 387 34T253 -22Q225 -22 199 -14T143 16T92 75T56 172T42 313ZM257 397Q227 397 205 380T171 335T154 278T148 216Q148 133 160 97T198 39Q222 21 251 21Q302 21 329 59Q342 77 347 104T352 209Q352 289 347 316T329 361Q302 397 257 397Z"></path><path stroke-width="1" id="E1-MJMAIN-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path><path stroke-width="1" id="E1-MJMAIN-73" d="M295 316Q295 356 268 385T190 414Q154 414 128 401Q98 382 98 349Q97 344 98 336T114 312T157 287Q175 282 201 278T245 269T277 256Q294 248 310 236T342 195T359 133Q359 71 321 31T198 -10H190Q138 -10 94 26L86 19L77 10Q71 4 65 -1L54 -11H46H42Q39 -11 33 -5V74V132Q33 153 35 157T45 162H54Q66 162 70 158T75 146T82 119T101 77Q136 26 198 26Q295 26 295 104Q295 133 277 151Q257 175 194 187T111 210Q75 227 54 256T33 318Q33 357 50 384T93 424T143 442T187 447H198Q238 447 268 432L283 424L292 431Q302 440 314 448H322H326Q329 448 335 442V310L329 304H301Q295 310 295 316Z"></path><path stroke-width="1" id="E1-MJMAIN-65" d="M28 218Q28 273 48 318T98 391T163 433T229 448Q282 448 320 430T378 380T406 316T415 245Q415 238 408 231H126V216Q126 68 226 36Q246 30 270 30Q312 30 342 62Q359 79 369 104L379 128Q382 131 395 131H398Q415 131 415 121Q415 117 412 108Q393 53 349 21T250 -11Q155 -11 92 58T28 218ZM333 275Q322 403 238 411H236Q228 411 220 410T195 402T166 381T143 340T127 274V267H333V275Z"></path><path stroke-width="1" id="E1-MJMAIN-63" d="M370 305T349 305T313 320T297 358Q297 381 312 396Q317 401 317 402T307 404Q281 408 258 408Q209 408 178 376Q131 329 131 219Q131 137 162 90Q203 29 272 29Q313 29 338 55T374 117Q376 125 379 127T395 129H409Q415 123 415 120Q415 116 411 104T395 71T366 33T318 2T249 -11Q163 -11 99 53T34 214Q34 318 99 383T250 448T370 421T404 357Q404 334 387 320Z"></path><path stroke-width="1" id="E1-MJMAIN-28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path><path stroke-width="1" id="E1-MJMATHI-79" d="M21 287Q21 301 36 335T84 406T158 442Q199 442 224 419T250 355Q248 336 247 334Q247 331 231 288T198 191T182 105Q182 62 196 45T238 27Q261 27 281 38T312 61T339 94Q339 95 344 114T358 173T377 247Q415 397 419 404Q432 431 462 431Q475 431 483 424T494 412T496 403Q496 390 447 193T391 -23Q363 -106 294 -155T156 -205Q111 -205 77 -183T43 -117Q43 -95 50 -80T69 -58T89 -48T106 -45Q150 -45 150 -87Q150 -107 138 -122T115 -142T102 -147L99 -148Q101 -153 118 -160T152 -167H160Q177 -167 186 -165Q219 -156 247 -127T290 -65T313 -9T321 21L315 17Q309 13 296 6T270 -6Q250 -11 231 -11Q185 -11 150 11T104 82Q103 89 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path><path stroke-width="1" id="E1-MJMAIN-29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path><path stroke-width="1" id="E1-MJMAIN-64" d="M376 495Q376 511 376 535T377 568Q377 613 367 624T316 637H298V660Q298 683 300 683L310 684Q320 685 339 686T376 688Q393 689 413 690T443 693T454 694H457V390Q457 84 458 81Q461 61 472 55T517 46H535V0Q533 0 459 -5T380 -11H373V44L365 37Q307 -11 235 -11Q158 -11 96 50T34 215Q34 315 97 378T244 442Q319 442 376 393V495ZM373 342Q328 405 260 405Q211 405 173 369Q146 341 139 305T131 211Q131 155 138 120T173 59Q203 26 251 26Q322 26 373 103V342Z"></path><path stroke-width="1" id="E1-MJMAIN-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path stroke-width="1" id="E1-MJMAIN-6C" d="M42 46H56Q95 46 103 60V68Q103 77 103 91T103 124T104 167T104 217T104 272T104 329Q104 366 104 407T104 482T104 542T103 586T103 603Q100 622 89 628T44 637H26V660Q26 683 28 683L38 684Q48 685 67 686T104 688Q121 689 141 690T171 693T182 694H185V379Q185 62 186 60Q190 52 198 49Q219 46 247 46H263V0H255L232 1Q209 2 183 2T145 3T107 3T57 1L34 0H26V46H42Z"></path><path stroke-width="1" id="E1-MJMAIN-6E" d="M41 46H55Q94 46 102 60V68Q102 77 102 91T102 122T103 161T103 203Q103 234 103 269T102 328V351Q99 370 88 376T43 385H25V408Q25 431 27 431L37 432Q47 433 65 434T102 436Q119 437 138 438T167 441T178 442H181V402Q181 364 182 364T187 369T199 384T218 402T247 421T285 437Q305 442 336 442Q450 438 463 329Q464 322 464 190V104Q464 66 466 59T477 49Q498 46 526 46H542V0H534L510 1Q487 2 460 2T422 3Q319 3 310 0H302V46H318Q379 46 379 62Q380 64 380 200Q379 335 378 343Q372 371 358 385T334 402T308 404Q263 404 229 370Q202 343 195 315T187 232V168V108Q187 78 188 68T191 55T200 49Q221 46 249 46H265V0H257L234 1Q210 2 183 2T145 3Q42 3 33 0H25V46H41Z"></path><path stroke-width="1" id="E1-MJMAIN-33" d="M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z"></path><path stroke-width="1" id="E1-MJMAIN-221A" d="M95 178Q89 178 81 186T72 200T103 230T169 280T207 309Q209 311 212 311H213Q219 311 227 294T281 177Q300 134 312 108L397 -77Q398 -77 501 136T707 565T814 786Q820 800 834 800Q841 800 846 794T853 782V776L620 293L385 -193Q381 -200 366 -200Q357 -200 354 -197Q352 -195 256 15L160 225L144 214Q129 202 113 190T95 178Z"></path><path stroke-width="1" id="E1-MJMATHI-69" d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z"></path><path stroke-width="1" id="E1-MJMAIN-34" d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z"></path><path stroke-width="1" id="E1-MJSZ1-28" d="M152 251Q152 646 388 850H416Q422 844 422 841Q422 837 403 816T357 753T302 649T255 482T236 250Q236 124 255 19T301 -147T356 -251T403 -315T422 -340Q422 -343 416 -349H388Q359 -325 332 -296T271 -213T212 -97T170 56T152 251Z"></path><path stroke-width="1" id="E1-MJSZ1-29" d="M305 251Q305 -145 69 -349H56Q43 -349 39 -347T35 -338Q37 -333 60 -307T108 -239T160 -136T204 27T221 250T204 473T160 636T108 740T60 807T35 839Q35 850 50 850H56H69Q197 743 256 566Q305 425 305 251Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJSZ2-222B" x="0" y="0"></use><g transform="translate(1060,1089)"><use transform="scale(0.707)" href="#E1-MJMATHI-3C0" x="0" y="0"></use><use transform="scale(0.707)" href="#E1-MJMAIN-2F" x="573" y="0"></use><use transform="scale(0.707)" href="#E1-MJMAIN-36" x="1074" y="0"></use></g><use transform="scale(0.707)" href="#E1-MJMAIN-30" x="787" y="-1270"></use><g transform="translate(2440,0)"><use href="#E1-MJMAIN-73"></use><use href="#E1-MJMAIN-65" x="394" y="0"></use><use href="#E1-MJMAIN-63" x="839" y="0"></use></g><g transform="translate(3724,0)"><use href="#E1-MJMAIN-28" x="0" y="0"></use><use href="#E1-MJMATHI-79" x="389" y="0"></use><use href="#E1-MJMAIN-29" x="887" y="0"></use></g><use href="#E1-MJMAIN-64" x="5167" y="0"></use><use href="#E1-MJMATHI-79" x="5890" y="0"></use><use href="#E1-MJMAIN-3D" x="6666" y="0"></use><g transform="translate(7722,0)"><use href="#E1-MJMAIN-6C"></use><use href="#E1-MJMAIN-6E" x="278" y="0"></use></g><g transform="translate(8557,0)"><use href="#E1-MJSZ1-28"></use><g transform="translate(458,0)"><use href="#E1-MJMAIN-221A" x="0" y="-3"></use><rect stroke="none" width="500" height="60" x="833" y="738"></rect><use href="#E1-MJMAIN-33" x="833" y="0"></use></g><g transform="translate(1792,0)"><use href="#E1-MJMATHI-69" x="0" y="0"></use><g transform="translate(345,412)"><use transform="scale(0.707)" href="#E1-MJMAIN-36"></use><use transform="scale(0.707)" href="#E1-MJMAIN-34" x="500" y="0"></use></g></g><use href="#E1-MJSZ1-29" x="2945" y="-1"></use></g></g></svg></switch></svg>`;

    mmlN.MathMLNow(tex, {
        formatName: "TeX",
        minify: false,
        fontSize: 16,
        verticalMarginPercent: 20
    }).then(result => {
        t.equal(result, expectedOutput);
    });
});

tape('Fallback test: check MathMlNow with Euler\'s identity', function (t) {
    t.plan(1);

    const tex = 'e^{i\\pi}+1=0';
    const expectedOutput = `<svg height="53" width="195" aria-label="e Superscript i pi Baseline plus 1 equals 0"><a class="mmln-f"><switch><foreignObject requiredExtensions="http://www.w3.org/1998/Math/MathML" height="53" width="195"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" alttext="e Superscript i pi Baseline plus 1 equals 0"><mstyle mathsize="30pt">
  <semantics>
    <mrow>
      <msup>
        <mi>e</mi>
        <mrow>
          <mi>i</mi>
          <mi>&#960;<!-- &#960; --></mi>
        </mrow>
      </msup>
      <mo>+</mo>
      <mn>1</mn>
      <mo>=</mo>
      <mn>0</mn>
    </mrow>
    <annotation encoding="application/x-tex">e^{i\\pi}+1=0</annotation>
  </semantics>
</mstyle></math></foreignObject><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="195" height="53" viewBox="0 -1006.6 4774.3 1223.9" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title"><title id="MathJax-SVG-1-Title">e Superscript i pi Baseline plus 1 equals 0</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJMATHI-65" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path><path stroke-width="1" id="E1-MJMATHI-69" d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z"></path><path stroke-width="1" id="E1-MJMATHI-3C0" d="M132 -11Q98 -11 98 22V33L111 61Q186 219 220 334L228 358H196Q158 358 142 355T103 336Q92 329 81 318T62 297T53 285Q51 284 38 284Q19 284 19 294Q19 300 38 329T93 391T164 429Q171 431 389 431Q549 431 553 430Q573 423 573 402Q573 371 541 360Q535 358 472 358H408L405 341Q393 269 393 222Q393 170 402 129T421 65T431 37Q431 20 417 5T381 -10Q370 -10 363 -7T347 17T331 77Q330 86 330 121Q330 170 339 226T357 318T367 358H269L268 354Q268 351 249 275T206 114T175 17Q164 -11 132 -11Z"></path><path stroke-width="1" id="E1-MJMAIN-2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path><path stroke-width="1" id="E1-MJMAIN-31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path><path stroke-width="1" id="E1-MJMAIN-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path stroke-width="1" id="E1-MJMAIN-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJMATHI-65" x="0" y="0"></use><g transform="translate(466,412)"><use transform="scale(0.707)" href="#E1-MJMATHI-69" x="0" y="0"></use><use transform="scale(0.707)" href="#E1-MJMATHI-3C0" x="345" y="0"></use></g><use href="#E1-MJMAIN-2B" x="1438" y="0"></use><use href="#E1-MJMAIN-31" x="2439" y="0"></use><use href="#E1-MJMAIN-3D" x="3217" y="0"></use><use href="#E1-MJMAIN-30" x="4273" y="0"></use></g></svg></switch></a><image src="/img/3040592419.png" height="53" width="195" alt="e Superscript i pi Baseline plus 1 equals 0" xlink:href="" class="mml-i"></image></svg>`;

    mmlN.MathMLNow(tex, {
        formatName: "TeX",
        minify: false,
        imageFolder: "/img/",
        fontSize: 30
    }).then(result => {
        t.equal(result, expectedOutput);
    }).catch(error => {
        t.fail(error);
    });
});

tape('Fallback test: check MathMlNow with the Quadratic formula', function (t) {
    t.plan(1);

    const tex = 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}';
    const expectedOutput = `<svg height="68" width="227" aria-label="x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction"><a class="mmln-f"><switch><foreignObject requiredExtensions="http://www.w3.org/1998/Math/MathML" height="68" width="227"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" alttext="x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction"><mstyle mathsize="18pt">
  <semantics>
    <mrow>
      <mi>x</mi>
      <mo>=</mo>
      <mfrac>
        <mrow>
          <mo>&#8722;<!-- &#8722; --></mo>
          <mi>b</mi>
          <mo>&#177;<!-- &#177; --></mo>
          <msqrt>
            <msup>
              <mi>b</mi>
              <mn>2</mn>
            </msup>
            <mo>&#8722;<!-- &#8722; --></mo>
            <mn>4</mn>
            <mi>a</mi>
            <mi>c</mi>
          </msqrt>
        </mrow>
        <mrow>
          <mn>2</mn>
          <mi>a</mi>
        </mrow>
      </mfrac>
    </mrow>
    <annotation encoding="application/x-tex">x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}</annotation>
  </semantics>
</mstyle></math></foreignObject><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="227" height="68" viewBox="0 -1867.7 9267.9 2659.1" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title"><title id="MathJax-SVG-1-Title">x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJMATHI-78" d="M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"></path><path stroke-width="1" id="E1-MJMAIN-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path stroke-width="1" id="E1-MJMAIN-2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path><path stroke-width="1" id="E1-MJMATHI-62" d="M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"></path><path stroke-width="1" id="E1-MJMAIN-B1" d="M56 320T56 333T70 353H369V502Q369 651 371 655Q376 666 388 666Q402 666 405 654T409 596V500V353H707Q722 345 722 333Q722 320 707 313H409V40H707Q722 32 722 20T707 0H70Q56 7 56 20T70 40H369V313H70Q56 320 56 333Z"></path><path stroke-width="1" id="E1-MJMAIN-32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path><path stroke-width="1" id="E1-MJMAIN-34" d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z"></path><path stroke-width="1" id="E1-MJMATHI-61" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"></path><path stroke-width="1" id="E1-MJMATHI-63" d="M34 159Q34 268 120 355T306 442Q362 442 394 418T427 355Q427 326 408 306T360 285Q341 285 330 295T319 325T330 359T352 380T366 386H367Q367 388 361 392T340 400T306 404Q276 404 249 390Q228 381 206 359Q162 315 142 235T121 119Q121 73 147 50Q169 26 205 26H209Q321 26 394 111Q403 121 406 121Q410 121 419 112T429 98T420 83T391 55T346 25T282 0T202 -11Q127 -11 81 37T34 159Z"></path><path stroke-width="1" id="E1-MJSZ1-221A" d="M263 249Q264 249 315 130T417 -108T470 -228L725 302Q981 837 982 839Q989 850 1001 850Q1008 850 1013 844T1020 832V826L741 243Q645 43 540 -176Q479 -303 469 -324T453 -348Q449 -350 436 -350L424 -349L315 -96Q206 156 205 156L171 130Q138 104 137 104L111 130L263 249Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJMATHI-78" x="0" y="0"></use><use href="#E1-MJMAIN-3D" x="850" y="0"></use><g transform="translate(1628,0)"><g transform="translate(397,0)"><rect stroke="none" width="7121" height="60" x="0" y="220"></rect><g transform="translate(60,775)"><use href="#E1-MJMAIN-2212" x="0" y="0"></use><use href="#E1-MJMATHI-62" x="778" y="0"></use><use href="#E1-MJMAIN-B1" x="1430" y="0"></use><g transform="translate(2430,0)"><use href="#E1-MJSZ1-221A" x="0" y="94"></use><rect stroke="none" width="3569" height="60" x="1000" y="885"></rect><g transform="translate(1000,0)"><use href="#E1-MJMATHI-62" x="0" y="0"></use><use transform="scale(0.707)" href="#E1-MJMAIN-32" x="607" y="408"></use><use href="#E1-MJMAIN-2212" x="1105" y="0"></use><use href="#E1-MJMAIN-34" x="2106" y="0"></use><use href="#E1-MJMATHI-61" x="2606" y="0"></use><use href="#E1-MJMATHI-63" x="3136" y="0"></use></g></g></g><g transform="translate(3045,-687)"><use href="#E1-MJMAIN-32" x="0" y="0"></use><use href="#E1-MJMATHI-61" x="500" y="0"></use></g></g></g></g></svg></switch></a><image src="/img/2591654204.png" height="68" width="227" alt="x equals StartFraction negative b plus-or-minus StartRoot b squared minus 4 a c EndRoot Over 2 a EndFraction" xlink:href="" class="mml-i"></image></svg>`;

    mmlN.MathMLNow(tex, {
        formatName: "TeX",
        minify: false,
        imageFolder: "/img/",
        fontSize: 18
    }).then(result => {
        t.equal(result, expectedOutput);
    }).catch(error => {
        t.fail(error);
    });
});

tape('Fallback test: check MathMlNow with the Integral of the secant function', function (t) {
    t.plan(1);

    const tex = '\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)';
    const expectedOutput = `<svg height="89" width="260" aria-label="integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis"><a class="mmln-f"><switch><foreignObject requiredExtensions="http://www.w3.org/1998/Math/MathML" height="89" width="260"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" alttext="integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis"><mstyle mathsize="16pt">
  <semantics>
    <mrow>
      <msubsup>
        <mo>&#8747;<!-- &#8747; --></mo>
        <mn>0</mn>
        <mrow>
          <mi>&#960;<!-- &#960; --></mi>
                  <mo>/</mo>
          <mn>6</mn>
        </mrow>
      </msubsup>
      <mi>sec</mi>
      <mo>&#8289;<!-- &#8289; --></mo>
      <mrow>
        <mo>(</mo>
        <mi>y</mi>
        <mo>)</mo>
      </mrow>
      <mi mathvariant="normal">d</mi>
      <mo>&#8289;<!-- &#8289; --></mo>
      <mi>y</mi>
      <mo>=</mo>
      <mi>ln</mi>
      <mo>&#8289;<!-- &#8289; --></mo>
      <mrow>
        <mo>(</mo>
        <msqrt>
          <mn>3</mn>
        </msqrt>
        <msup>
          <mi>i</mi>
                  <mn>64</mn>
        </msup>
        <mo>)</mo>
      </mrow>
    </mrow>
    <annotation encoding="application/x-tex">\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)</annotation>
  </semantics>
</mstyle></math></foreignObject><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="63" viewBox="0 -1724.2 11961.7 2730.8" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title" y="13"><title id="MathJax-SVG-1-Title">integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJSZ2-222B" d="M114 -798Q132 -824 165 -824H167Q195 -824 223 -764T275 -600T320 -391T362 -164Q365 -143 367 -133Q439 292 523 655T645 1127Q651 1145 655 1157T672 1201T699 1257T733 1306T777 1346T828 1360Q884 1360 912 1325T944 1245Q944 1220 932 1205T909 1186T887 1183Q866 1183 849 1198T832 1239Q832 1287 885 1296L882 1300Q879 1303 874 1307T866 1313Q851 1323 833 1323Q819 1323 807 1311T775 1255T736 1139T689 936T633 628Q574 293 510 -5T410 -437T355 -629Q278 -862 165 -862Q125 -862 92 -831T55 -746Q55 -711 74 -698T112 -685Q133 -685 150 -700T167 -741Q167 -789 114 -798Z"></path><path stroke-width="1" id="E1-MJMATHI-3C0" d="M132 -11Q98 -11 98 22V33L111 61Q186 219 220 334L228 358H196Q158 358 142 355T103 336Q92 329 81 318T62 297T53 285Q51 284 38 284Q19 284 19 294Q19 300 38 329T93 391T164 429Q171 431 389 431Q549 431 553 430Q573 423 573 402Q573 371 541 360Q535 358 472 358H408L405 341Q393 269 393 222Q393 170 402 129T421 65T431 37Q431 20 417 5T381 -10Q370 -10 363 -7T347 17T331 77Q330 86 330 121Q330 170 339 226T357 318T367 358H269L268 354Q268 351 249 275T206 114T175 17Q164 -11 132 -11Z"></path><path stroke-width="1" id="E1-MJMAIN-2F" d="M423 750Q432 750 438 744T444 730Q444 725 271 248T92 -240Q85 -250 75 -250Q68 -250 62 -245T56 -231Q56 -221 230 257T407 740Q411 750 423 750Z"></path><path stroke-width="1" id="E1-MJMAIN-36" d="M42 313Q42 476 123 571T303 666Q372 666 402 630T432 550Q432 525 418 510T379 495Q356 495 341 509T326 548Q326 592 373 601Q351 623 311 626Q240 626 194 566Q147 500 147 364L148 360Q153 366 156 373Q197 433 263 433H267Q313 433 348 414Q372 400 396 374T435 317Q456 268 456 210V192Q456 169 451 149Q440 90 387 34T253 -22Q225 -22 199 -14T143 16T92 75T56 172T42 313ZM257 397Q227 397 205 380T171 335T154 278T148 216Q148 133 160 97T198 39Q222 21 251 21Q302 21 329 59Q342 77 347 104T352 209Q352 289 347 316T329 361Q302 397 257 397Z"></path><path stroke-width="1" id="E1-MJMAIN-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path><path stroke-width="1" id="E1-MJMAIN-73" d="M295 316Q295 356 268 385T190 414Q154 414 128 401Q98 382 98 349Q97 344 98 336T114 312T157 287Q175 282 201 278T245 269T277 256Q294 248 310 236T342 195T359 133Q359 71 321 31T198 -10H190Q138 -10 94 26L86 19L77 10Q71 4 65 -1L54 -11H46H42Q39 -11 33 -5V74V132Q33 153 35 157T45 162H54Q66 162 70 158T75 146T82 119T101 77Q136 26 198 26Q295 26 295 104Q295 133 277 151Q257 175 194 187T111 210Q75 227 54 256T33 318Q33 357 50 384T93 424T143 442T187 447H198Q238 447 268 432L283 424L292 431Q302 440 314 448H322H326Q329 448 335 442V310L329 304H301Q295 310 295 316Z"></path><path stroke-width="1" id="E1-MJMAIN-65" d="M28 218Q28 273 48 318T98 391T163 433T229 448Q282 448 320 430T378 380T406 316T415 245Q415 238 408 231H126V216Q126 68 226 36Q246 30 270 30Q312 30 342 62Q359 79 369 104L379 128Q382 131 395 131H398Q415 131 415 121Q415 117 412 108Q393 53 349 21T250 -11Q155 -11 92 58T28 218ZM333 275Q322 403 238 411H236Q228 411 220 410T195 402T166 381T143 340T127 274V267H333V275Z"></path><path stroke-width="1" id="E1-MJMAIN-63" d="M370 305T349 305T313 320T297 358Q297 381 312 396Q317 401 317 402T307 404Q281 408 258 408Q209 408 178 376Q131 329 131 219Q131 137 162 90Q203 29 272 29Q313 29 338 55T374 117Q376 125 379 127T395 129H409Q415 123 415 120Q415 116 411 104T395 71T366 33T318 2T249 -11Q163 -11 99 53T34 214Q34 318 99 383T250 448T370 421T404 357Q404 334 387 320Z"></path><path stroke-width="1" id="E1-MJMAIN-28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path><path stroke-width="1" id="E1-MJMATHI-79" d="M21 287Q21 301 36 335T84 406T158 442Q199 442 224 419T250 355Q248 336 247 334Q247 331 231 288T198 191T182 105Q182 62 196 45T238 27Q261 27 281 38T312 61T339 94Q339 95 344 114T358 173T377 247Q415 397 419 404Q432 431 462 431Q475 431 483 424T494 412T496 403Q496 390 447 193T391 -23Q363 -106 294 -155T156 -205Q111 -205 77 -183T43 -117Q43 -95 50 -80T69 -58T89 -48T106 -45Q150 -45 150 -87Q150 -107 138 -122T115 -142T102 -147L99 -148Q101 -153 118 -160T152 -167H160Q177 -167 186 -165Q219 -156 247 -127T290 -65T313 -9T321 21L315 17Q309 13 296 6T270 -6Q250 -11 231 -11Q185 -11 150 11T104 82Q103 89 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path><path stroke-width="1" id="E1-MJMAIN-29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path><path stroke-width="1" id="E1-MJMAIN-64" d="M376 495Q376 511 376 535T377 568Q377 613 367 624T316 637H298V660Q298 683 300 683L310 684Q320 685 339 686T376 688Q393 689 413 690T443 693T454 694H457V390Q457 84 458 81Q461 61 472 55T517 46H535V0Q533 0 459 -5T380 -11H373V44L365 37Q307 -11 235 -11Q158 -11 96 50T34 215Q34 315 97 378T244 442Q319 442 376 393V495ZM373 342Q328 405 260 405Q211 405 173 369Q146 341 139 305T131 211Q131 155 138 120T173 59Q203 26 251 26Q322 26 373 103V342Z"></path><path stroke-width="1" id="E1-MJMAIN-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path stroke-width="1" id="E1-MJMAIN-6C" d="M42 46H56Q95 46 103 60V68Q103 77 103 91T103 124T104 167T104 217T104 272T104 329Q104 366 104 407T104 482T104 542T103 586T103 603Q100 622 89 628T44 637H26V660Q26 683 28 683L38 684Q48 685 67 686T104 688Q121 689 141 690T171 693T182 694H185V379Q185 62 186 60Q190 52 198 49Q219 46 247 46H263V0H255L232 1Q209 2 183 2T145 3T107 3T57 1L34 0H26V46H42Z"></path><path stroke-width="1" id="E1-MJMAIN-6E" d="M41 46H55Q94 46 102 60V68Q102 77 102 91T102 122T103 161T103 203Q103 234 103 269T102 328V351Q99 370 88 376T43 385H25V408Q25 431 27 431L37 432Q47 433 65 434T102 436Q119 437 138 438T167 441T178 442H181V402Q181 364 182 364T187 369T199 384T218 402T247 421T285 437Q305 442 336 442Q450 438 463 329Q464 322 464 190V104Q464 66 466 59T477 49Q498 46 526 46H542V0H534L510 1Q487 2 460 2T422 3Q319 3 310 0H302V46H318Q379 46 379 62Q380 64 380 200Q379 335 378 343Q372 371 358 385T334 402T308 404Q263 404 229 370Q202 343 195 315T187 232V168V108Q187 78 188 68T191 55T200 49Q221 46 249 46H265V0H257L234 1Q210 2 183 2T145 3Q42 3 33 0H25V46H41Z"></path><path stroke-width="1" id="E1-MJMAIN-33" d="M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z"></path><path stroke-width="1" id="E1-MJMAIN-221A" d="M95 178Q89 178 81 186T72 200T103 230T169 280T207 309Q209 311 212 311H213Q219 311 227 294T281 177Q300 134 312 108L397 -77Q398 -77 501 136T707 565T814 786Q820 800 834 800Q841 800 846 794T853 782V776L620 293L385 -193Q381 -200 366 -200Q357 -200 354 -197Q352 -195 256 15L160 225L144 214Q129 202 113 190T95 178Z"></path><path stroke-width="1" id="E1-MJMATHI-69" d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z"></path><path stroke-width="1" id="E1-MJMAIN-34" d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z"></path><path stroke-width="1" id="E1-MJSZ1-28" d="M152 251Q152 646 388 850H416Q422 844 422 841Q422 837 403 816T357 753T302 649T255 482T236 250Q236 124 255 19T301 -147T356 -251T403 -315T422 -340Q422 -343 416 -349H388Q359 -325 332 -296T271 -213T212 -97T170 56T152 251Z"></path><path stroke-width="1" id="E1-MJSZ1-29" d="M305 251Q305 -145 69 -349H56Q43 -349 39 -347T35 -338Q37 -333 60 -307T108 -239T160 -136T204 27T221 250T204 473T160 636T108 740T60 807T35 839Q35 850 50 850H56H69Q197 743 256 566Q305 425 305 251Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJSZ2-222B" x="0" y="0"></use><g transform="translate(1060,1089)"><use transform="scale(0.707)" href="#E1-MJMATHI-3C0" x="0" y="0"></use><use transform="scale(0.707)" href="#E1-MJMAIN-2F" x="573" y="0"></use><use transform="scale(0.707)" href="#E1-MJMAIN-36" x="1074" y="0"></use></g><use transform="scale(0.707)" href="#E1-MJMAIN-30" x="787" y="-1270"></use><g transform="translate(2440,0)"><use href="#E1-MJMAIN-73"></use><use href="#E1-MJMAIN-65" x="394" y="0"></use><use href="#E1-MJMAIN-63" x="839" y="0"></use></g><g transform="translate(3724,0)"><use href="#E1-MJMAIN-28" x="0" y="0"></use><use href="#E1-MJMATHI-79" x="389" y="0"></use><use href="#E1-MJMAIN-29" x="887" y="0"></use></g><use href="#E1-MJMAIN-64" x="5167" y="0"></use><use href="#E1-MJMATHI-79" x="5890" y="0"></use><use href="#E1-MJMAIN-3D" x="6666" y="0"></use><g transform="translate(7722,0)"><use href="#E1-MJMAIN-6C"></use><use href="#E1-MJMAIN-6E" x="278" y="0"></use></g><g transform="translate(8557,0)"><use href="#E1-MJSZ1-28"></use><g transform="translate(458,0)"><use href="#E1-MJMAIN-221A" x="0" y="-3"></use><rect stroke="none" width="500" height="60" x="833" y="738"></rect><use href="#E1-MJMAIN-33" x="833" y="0"></use></g><g transform="translate(1792,0)"><use href="#E1-MJMATHI-69" x="0" y="0"></use><g transform="translate(345,412)"><use transform="scale(0.707)" href="#E1-MJMAIN-36"></use><use transform="scale(0.707)" href="#E1-MJMAIN-34" x="500" y="0"></use></g></g><use href="#E1-MJSZ1-29" x="2945" y="-1"></use></g></g></svg></switch></a><image src="/img/3602555756.png" height="63" width="260" alt="integral Subscript 0 Superscript pi slash 6 Baseline secant left-parenthesis y right-parenthesis normal d y equals ln left-parenthesis StartRoot 3 EndRoot i Superscript 64 Baseline right-parenthesis" xlink:href="" class="mml-i"></image></svg>`;

    mmlN.MathMLNow(tex, {
        formatName: "TeX",
        minify: false,
        imageFolder: "/img/",
        fontSize: 16,
        verticalMarginPercent: 20
    }).then(result => {
        t.equal(result, expectedOutput);
    }).catch(error => {
        t.fail(error);
    });
});