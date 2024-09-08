interface LoggerParam {
  title?: string;
  msg: any;
  force?: boolean;
}
type LoggerFunction = (params: LoggerParam) => any;
interface Logger {
  log: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}

// Flags to check console log enabled or not (Default true)
// const reportingLevel = process.env.LOGGER_REPORTING_LEVEL ? Number(process.env.LOGGER_REPORTING_LEVEL) : 4;
function getReportingLevel () {
  return 4;
}

const logEnabled = (): boolean => getReportingLevel() >= 1;
const infoEnabled = (): boolean => getReportingLevel() >= 2;
const warnEnabled = (): boolean => getReportingLevel() >= 3;
const errorEnabled = (): boolean => getReportingLevel() === 4;

/**
 * Logs a message to the console.
 */
const log = (param: LoggerParam) => {
  const { title = '', force = false, msg = '' } = param;
  if (param && (logEnabled() || force)) {
    const data = title ? [title, msg] : [msg];
    // eslint-disable-next-line no-console
    console.log(...data);
  }
};

/**
 * Logs an information message to the console.
 */
const info = (param: LoggerParam) => {
  const { title = '', force = false, msg = '' } = param;
  if (param && (infoEnabled() || force)) {
    const data = title ? [title, msg] : [msg];
    // eslint-disable-next-line no-console
    console.info(...data);
  }
};

/**
 * Logs a warning message to the console.
 */
const warn = (param: LoggerParam) => {
  const { title = '', force = false, msg = '' } = param;
  if (param && (warnEnabled() || force)) {
    const data = title ? [title, msg] : [msg];
    // eslint-disable-next-line no-console
    console.warn(...data);
  }
};

/**
 * Logs an error message to the console.
 */
const error = (param: LoggerParam) => {
  const { title = '', force = false, msg = '' } = param;
  if (param && (errorEnabled() || force)) {
    const data = title ? [title, msg] : [msg];
    // eslint-disable-next-line no-console
    console.error(...data);
  }
};

/**
 * EXAMPLE USAGE
 * logger.log({ title: 'label', msg: { demoObj: 'Demo Message' } });
 * logger.log({ msg: ['val1', 'val2', 'val3'] });
 * logger.info({ title: '1 + 1 =', msg: (1 + 1) });
 * logger.warn({ msg: 'Demo Warning Message' });
 * logger.error({ msg: 'Demo Error Message', force: true });
 */

const logger: Logger = {
  log,
  info,
  warn,
  error
};

export default logger;
