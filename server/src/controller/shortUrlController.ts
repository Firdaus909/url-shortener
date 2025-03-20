import express from 'express';
import { shortUrlModel } from '../model/shortUrlModel';

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { fullUrl } = req.body;

  try {
    const urlFound = await shortUrlModel.find({ fullUrl });

    if (urlFound.length > 0) {
      res.status(409).send({ message: 'URL already exists', URL: urlFound });
    } else {
      const url = await shortUrlModel.create({ fullUrl });
      res.status(201).send(url);
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const getAllUrls = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const urls = await shortUrlModel.find();

    if (urls.length < 1) {
      res.status(404).send({ message: 'No URLs found' });
    } else {
      res.status(200).send(urls);
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  const { shortUrl } = req.params;

  try {
    const url = await shortUrlModel.findOne({ shortUrl });

    if (!url) {
      res.status(404).send({ message: 'URL not found' });
    } else {
      url.clicks++;
      await url.save();
      return res.redirect(302, url.fullUrl);
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const getUrlSSE = async (
  req: express.Request,
  res: express.Response
) => {
  const { shortUrl } = req.params;

  // Set header untuk SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    let lastClicks = -1;

    const sendEvent = (clicks: number) => {
      res.write(`data: ${JSON.stringify({ clicks })}\n\n`);
    };

    const intervalId = setInterval(async () => {
      const url = await shortUrlModel.findOne({ shortUrl });

      if (!url) {
        clearInterval(intervalId);
        res.status(404).send({ message: 'URL not found' });
        res.end();
        return;
      }

      if (url.clicks !== lastClicks) {
        sendEvent(url.clicks);
        lastClicks = url.clicks;
      }
    }, 1000);

    req.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  try {
    await shortUrlModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
