import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/models/attendance.dart';

class DateScreen extends StatelessWidget {
  final int year;
  final int month;
  final List<Attendance> attendances;
  late final List<DateTime> dates;
  late final List<ShowAttendance> showAttendances;

  DateScreen({
    super.key,
    required this.year,
    required this.month,
    required this.attendances,
  }) {
    dates = generateDates(year, month);
    showAttendances = generateShowAttendances(attendances, dates);
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

  List<ShowAttendance> generateShowAttendances(
      List<Attendance> attendances, List<DateTime> dates) {
    List<ShowAttendance> results = [];
    for (var date in dates) {
      ShowAttendance sa = ShowAttendance(
          day: date.day,
          checkIn: "-",
          checkOut: "-",
          breakStart: "-",
          breakEnd: "-");
      for (var attendance in attendances) {
        DateTime dateTime = DateTime.parse(attendance.time.trim()).toLocal();
        if (dateTime.day == date.day) {
          DateFormat timeFormat = DateFormat.Hms();
          String time = timeFormat.format(dateTime).toString();
          switch (attendance.state) {
            case "checkIn":
              sa.checkIn = time;
              break;
            case "checkOut":
              sa.checkOut = time;
              break;
            case "breakStart":
              sa.breakStart = time;
              break;
            case "breakEnd":
              sa.breakEnd = time;
              break;
          }
        }
      }
      results.add(sa);
    }
    return results;
  }

  int calculateTotalTime(List<ShowAttendance> showAttendances) {
    int differenceInSeconds(String time1, String time2) {
      // 時間の文字列をパースして秒数に変換する
      List<String> timeParts1 = time1.split(':');
      List<String> timeParts2 = time2.split(':');

      int hours1 = int.parse(timeParts1[0]);
      int minutes1 = int.parse(timeParts1[1]);
      int seconds1 = int.parse(timeParts1[2]);

      int hours2 = int.parse(timeParts2[0]);
      int minutes2 = int.parse(timeParts2[1]);
      int seconds2 = int.parse(timeParts2[2]);

      // 時間の差を計算して秒数に変換する
      int totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
      int totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

      // 時間の差を秒数で返す
      return (totalSeconds1 - totalSeconds2).abs();
    }

    int result = 0;
    for (var showAttendance in showAttendances) {
      if (showAttendance.checkIn == "-") {
        result += 0;
      } else if (showAttendance.breakStart == "-") {
        result += differenceInSeconds(
            showAttendance.checkIn, showAttendance.checkOut);
      } else {
        result += differenceInSeconds(
                showAttendance.checkIn, showAttendance.checkOut) -
            differenceInSeconds(
                showAttendance.breakStart, showAttendance.breakEnd);
      }
    }
    return result;
  }

  String formatSeconds(int seconds) {
    int hours = seconds ~/ 3600;
    int minutes = (seconds ~/ 60) % 60;

    return '${hours.toString().padLeft(2, "0")}:${minutes.toString().padLeft(2, "0")}';
  }

  String hhmm(String time) {
    if (time == '-') {
      return '-';
    }
    List<String> parts = time.split(":");
    return '${parts[0]}:${parts[1]}';
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
              const Padding(
                padding: EdgeInsets.all(4.0),
                child: Text(
                  '合計勤務時間    ',
                  style: TextStyle(
                    fontSize: 16, // フォントサイズを20に設定
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(4.0),
                child: Text(
                  formatSeconds(calculateTotalTime(showAttendances)),
                  style: const TextStyle(
                    decoration: TextDecoration.underline,
                    decorationThickness: 2.0,
                    decorationColor: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 20, // フォントサイズを20に設定
                  ),
                ),
              ),
            ],
          ),
        ),
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
                    subtitle: ShowAttendanceWidget(showAttendances[index]),
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

  Widget ShowAttendanceWidget(ShowAttendance showAttendance) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(4.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(182, 251, 182, 1),
                    borderRadius: BorderRadius.circular(10), // 丸みを持たせる
                  ),
                  child: const Text(
                    '出勤',
                    textAlign: TextAlign.center, // テキストを中央揃えにする
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Text(
                  hhmm(showAttendance.checkIn),
                  textAlign: TextAlign.center, // テキストを中央揃えにする
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(4.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(173, 216, 230, 1),
                    borderRadius: BorderRadius.circular(10), // 丸みを持たせる
                  ),
                  child: const Text(
                    '休憩始め',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Text(
                  hhmm(showAttendance.breakStart),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(4.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: const Color.fromRGBO(255, 255, 153, 1.0),
                    borderRadius: BorderRadius.circular(10), // 丸みを持たせる
                  ),
                  child: const Text(
                    '休憩終わり',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Text(
                  hhmm(showAttendance.breakEnd),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(4.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(255, 204, 153, 1),
                    borderRadius: BorderRadius.circular(10), // 丸みを持たせる
                  ),
                  child: const Text(
                    '退勤',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Text(
                  hhmm(showAttendance.checkOut),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
        )
      ],
    );
  }
}
