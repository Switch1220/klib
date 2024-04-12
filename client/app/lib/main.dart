import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:material_symbols_icons/symbols.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  App({super.key});

  final dark = ThemeData.from(
    colorScheme: ColorScheme.fromSeed(
      brightness: Brightness.dark,
      seedColor: Color(0xFFa7353e),
    ),
  );
  final light = ThemeData.from(
    colorScheme: ColorScheme.fromSeed(
      brightness: Brightness.light,
      seedColor: Color(0xFFa7353e),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      darkTheme: dark.copyWith(
        textTheme: GoogleFonts.ibmPlexSansKrTextTheme(dark.textTheme),
      ),
      theme: light.copyWith(
        textTheme: GoogleFonts.ibmPlexSansKrTextTheme(light.textTheme),
      ),
      home: Main(),
    );
  }
}

class Main extends StatelessWidget {
  const Main({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: NavigationBar(
        destinations: [
          NavigationDestination(
            selectedIcon: Icon(
              Symbols.home,
              fill: 1,
            ),
            icon: Icon(Symbols.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Symbols.account_circle),
            label: 'Account',
          ),
          NavigationDestination(
            icon: Icon(Symbols.settings),
            label: 'Settings',
          ),
        ],
      ),
      body: SafeArea(
        top: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: EdgeInsets.only(
                top: 120,
                left: 30,
                right: 30,
                bottom: 0,
              ),
              alignment: Alignment.centerLeft,
              // color: Theme.of(context).colorScheme.secondary,
              child: Text(
                'KLIB',
                style: GoogleFonts.bebasNeue(
                  // color: Theme.of(context).colorScheme.primary,
                  fontWeight: FontWeight.w500,
                  textStyle: Theme.of(context).textTheme.displayMedium,
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 15),
                child: GridView.count(
                  padding: EdgeInsets.zero,
                  crossAxisCount: 2,
                  children: [
                    KCard(
                      title: '좌석 및 스터디룸 예약',
                      description: '중앙도서관',
                      children: [
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Text(
                            '71/103',
                            style: Theme.of(context).textTheme.labelSmall,
                          ),
                        ),
                        SizedBox(height: 2),
                        const LinearProgressIndicator(
                          value: 0.7,
                        ),
                      ],
                    ),
                    KCard(
                      title: '주변 스터디카페 찾아보기',
                      description: '만석일 경우 여기로!',
                      children: [
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Icon(Symbols.search),
                        ),
                      ],
                    ),
                    KCard(
                      title: '담요대여',
                      description: '추워요?',
                      children: [
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Icon(Symbols.thermometer_loss),
                        ),
                      ],
                    ),
                    KCard(
                      title: '문의',
                      description: '담요로 안되면...',
                      children: [
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Icon(Symbols.emoji_people),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // Padding(
            //   padding: const EdgeInsets.symmetric(horizontal: 20),
            //   child: Card(
            //     child: Container(
            //       padding:
            //           const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            //       child: Column(
            //         children: [
            //           Align(
            //             alignment: Alignment.centerLeft,
            //             child: Text(
            //               '도서관 자리 예약',
            //               style: Theme.of(context)
            //                   .textTheme
            //                   .titleLarge
            //                   ?.copyWith(fontWeight: FontWeight.w900),
            //             ),
            //           ),
            //           Align(
            //             alignment: Alignment.centerLeft,
            //             child: Text(
            //               '예약 및 자리 확인하기',
            //               style: Theme.of(context).textTheme.labelLarge,
            //             ),
            //           ),
            //           const SizedBox(height: 30),
            //           Align(
            //             alignment: Alignment.centerRight,
            //             child: Text('57/122',
            //                 style: Theme.of(context).textTheme.labelSmall),
            //           ),
            //           const LinearProgressIndicator(
            //             value: 0.73,
            //           )
            //         ],
            //       ),
            //     ),
            //   ),
            // ),
            // Padding(
            //   padding: const EdgeInsets.symmetric(horizontal: 20),
            //   child: KCard(
            //     title: '주변 스터디카페 찾아보기',
            //     description: '만석일 경우 여기로!',
            //     children: [
            //       Align(
            //         alignment: Alignment.centerRight,
            //         child: FilledButton.tonal(
            //           onPressed: () {},
            //           child: Text('Explore'),
            //         ),
            //       ),
            //     ],
            //   ),
            // ),
            // Padding(
            //   padding: const EdgeInsets.symmetric(horizontal: 20),
            //   child: KCard(
            //     title: '데스크로 문의하기',
            //     description: '여기 너무 추워요~',
            //   ),
            // ),
          ],
        ),
      ),
    );
  }
}

class KCard extends StatelessWidget {
  const KCard({
    super.key,
    required this.title,
    required this.description,
    this.children,
  });

  final String title;
  final String description;
  final List<Widget>? children;

  @override
  Widget build(BuildContext context) {
    List<Widget> child = [
      Align(
        alignment: Alignment.centerLeft,
        child: Text(
          title,
          style: Theme.of(context)
              .textTheme
              .titleLarge
              ?.copyWith(fontWeight: FontWeight.w900),
        ),
      ),
      Align(
        alignment: Alignment.centerLeft,
        child: Text(
          description,
          style: Theme.of(context).textTheme.labelLarge,
        ),
      ),
      Spacer(),
      SizedBox(),
    ];

    if (children != null) {
      child += children!;
    }

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {},
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: child,
          ),
        ),
      ),
    );
  }
}
