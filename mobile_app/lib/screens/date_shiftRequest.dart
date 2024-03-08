import 'package:flutter/material.dart';
import 'package:mobile_app/screens/hour_minute_screen.dart';

class DateScreen extends StatefulWidget {
  final int year;
  final int month;
  final Future<String> Function(String, String, List<List<String>>)
      patchShiftRequest;

  DateScreen({
    super.key,
    required this.year,
    required this.month,
    required this.patchShiftRequest,
  });

  @override
  State<DateScreen> createState() => _DateScreenState();
}

class _DateScreenState extends State<DateScreen> {
  late final int _year;
  late final int _month;
  late final Future<String> Function(String, String, List<List<String>>)
      patchShiftRequest;
  late final List<DateTime> dates;
  List<List<String>> _shiftRequest = [];

  @override
  void initState() {
    super.initState();
    _year = widget.year;
    _month = widget.month;
    patchShiftRequest = widget.patchShiftRequest;
    dates = generateDates(_year, _month);
    _shiftRequest = List<List<String>>.generate(
        dates.length, (index) => ["00:00", "00:00"]);
  }

  List<DateTime> generateDates(int year, int month) {
    List<DateTime> dates = [];
    DateTime startDate = DateTime(year, month, 1);
    DateTime endDate = DateTime(year, month + 1, 1);
    for (DateTime date = startDate;
        date.isBefore(endDate);
        date = date.add(const Duration(days: 1))) {
      dates.add(date);
    }
    return dates;
  }

  void changeShiftRequest(String newShiftRequest, int index, bool isStart) {
    if (isStart) {
      _shiftRequest[index][0] = newShiftRequest;
    } else {
      _shiftRequest[index][1] = newShiftRequest;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        elevation: 8, // 影の強さを調整
                      ),
                      onPressed: () {
                        patchShiftRequest(
                            _year.toString(), _month.toString(), _shiftRequest);
                        setState(() {
                          _shiftRequest = List<List<String>>.generate(
                              dates.length, (index) => ["00:00", "00:00"]);
                        });
                      },
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.send),
                          SizedBox(width: 8),
                          Text("提出"),
                        ],
                      ),
                    ))
              ],
            )),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: ListView.builder(
              itemCount: dates.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.all(2.0),
                  child: ListTile(
                    contentPadding:
                        const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                      side: const BorderSide(color: Colors.grey, width: 1.0),
                    ),
                    title: Text(
                      '${dates[index].month}/${dates[index].day}',
                      style: const TextStyle(
                        fontSize: 20,
                      ),
                    ),
                    subtitle: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(
                                      bottom: 16.0, left: 24.0),
                                  child: Container(
                                      width: 200,
                                      decoration: BoxDecoration(
                                        color: Color.fromRGBO(182, 251, 182, 1),
                                        borderRadius: BorderRadius.circular(
                                            10.0), // 丸みを持たせる
                                      ),
                                      child: const Text(
                                        "開始",
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      )),
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(Icons.chevron_right),
                                    TimePicker(
                                      onTimeSelected: (time) {
                                        changeShiftRequest(
                                            '${time.hour.toString().padLeft(2, "0")}:${time.minute.toString().padLeft(2, "0")}',
                                            index,
                                            true);
                                      },
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                        Expanded(
                          child: Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(
                                    bottom: 16.0, left: 24.0),
                                child: Container(
                                    width: 200,
                                    decoration: BoxDecoration(
                                      color: Color.fromRGBO(255, 204, 153, 1),
                                      borderRadius: BorderRadius.circular(
                                          10.0), // 丸みを持たせる
                                    ),
                                    child: const Text(
                                      "終了",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    )),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.chevron_right),
                                  TimePicker(
                                    onTimeSelected: (time) {
                                      changeShiftRequest(
                                          '${time.hour.toString().padLeft(2, "0")}:${time.minute.toString().padLeft(2, "0")}',
                                          index,
                                          false);
                                    },
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    onTap: () {
                      // 日付がタップされた時の処理を追加
                      // 例えば、日付ごとの詳細画面に遷移するなど
                    },
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }
}
